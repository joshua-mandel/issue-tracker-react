import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from './InputField';
import _ from 'lodash';
import { FaEdit } from 'react-icons/fa';

function NewBug({ auth, showError, showSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [pending, setPending] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [stepsToReproduceError, setStepsToReproduceError] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function onClickSubmit(evt) {
    evt.preventDefault();
    setTitleError(!title ? 'Please include a Title.' : '');
    setDescriptionError(!description ? 'Please include a description' : '');
    setStepsToReproduceError(!stepsToReproduce ? 'Please include Steps to Reproduce' : '');
    setPending(true);
    setError('');
    setSuccess('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/new`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: {
        title: title,
        description: description,
        stepsToReproduce: stepsToReproduce,
      },
    })
      .then((res) => {
        const bugId = res.data.bugId;
        console.log(res.data);
        setPending(false);
        if (_.isObject(res.data)) {
          // setBug(res.data);
          navigate('/bug/list');
          showSuccess(`New Bug Reported. BugId: ${bugId}`);
        } else {
          setError('Expected an object');
          showError(error + ' Expected an object');
        }
      })
      .catch((err) => {
        console.log('Bug Not Reported');
        console.error(err);
        setPending(false);
        setError(err.message);
        showError('Please fix the errors.');
      });
  }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  return (
    <div className="container col-md-6">
      <div className='d-flex align-items-center'>
        <FaEdit className='fs-3 mb-1 me-3' />
        <h3 className="mb-2 fs-1">Report a New Bug</h3>
      </div>
      
      <h5 className="mb-3 fs-4">Welcome {auth?.payload.fullName}</h5>
      <form>
        <InputField
          label="Title:"
          id="title-update"
          value={title}
          onChange={(evt) => onInputChange(evt, setTitle)}
          placeholder="Enter the title"
          error={titleError}
        />
        <InputField
          label="Description:"
          id="title-update"
          value={description}
          onChange={(evt) => onInputChange(evt, setDescription)}
          placeholder="Enter the description"
          error={descriptionError}
        />
        <InputField
          label="Steps to Reproduce:"
          id="steps-to-reproduce"
          value={stepsToReproduce}
          onChange={(evt) => onInputChange(evt, setStepsToReproduce)}
          placeholder="Enter the steps to reproduce"
          error={stepsToReproduceError}
        />
        {error && <div className="text-danger mb-3">{'Please fix the errors above'}</div>}
        {!pending && (
          <button className="btn btn-primary me-3" type="submit" onClick={(evt) => onClickSubmit(evt)}>
            Report Bug
          </button>
        )}
        {pending && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default NewBug;
