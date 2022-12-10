import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InputField from './InputField';
import DropDown from './DropDown';
import axios from 'axios';
import _ from 'lodash';

function BugEditor({ auth, showError, showSuccess }) {
  const { bugId } = useParams();
  const [bug, setBug] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [assignedTo, setAssignedTo] = useState();
  const [closed, setClosed] = useState();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(true);

  const navigate = useNavigate();

  const titleError = !title ? 'Please include a title.' : '';

  const descriptionError = !description ? 'Please include a description' : '';

  const stepsToReproduceError = !stepsToReproduce ? 'Please include stepsToReproduce' : '';

  useEffect(() => {
    setPending(true);
    setTimeout(() => {
      axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
        method: 'get',
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setPending(false);
          setBug(res.data);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setStepsToReproduce(res.data.stepsToReproduce);
        })
        .catch((err) => {
          console.log(err);
          setPending(false);
          setError(err.message);
          showError(err.message);
        });
    }, 250);
  }, [auth, showError, bugId]);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  function onClickSubmit(evt) {
    evt.preventDefault();
      setPending(true);
      setError('');
      setSuccess('');
      axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
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
          console.log(res.data);
          console.log(`Bug: `, bug);
          setPending(false);
          if (_.isObject(res.data)) {
            // setBug(res.data);
            navigate('/bug/list');
            showSuccess(`Bug with id: ${bugId} updated`);
          } else {
            setError('Expected an object');
            showError(error + ' Expected an object');
          }
        })
        .catch((err) => {
          console.log(`Bug: `, bug);
          console.error(err);
          setPending(false);
          setError(err.message);
          showError('Please fix the errors.');
        });
    
  }

  return (
    <div className="container col-md-6">
      <h3 className="mb-2">Bug Editor</h3>
      <h5 className="mb-2">Welcome {auth?.payload.fullName}</h5>
      {bug && (
        <form>
          <h4 className="mb-3">BugId: {bugId}</h4>
          <InputField
            label="Title:"
            id="title-update"
            value={title}
            onChange={(evt) => onInputChange(evt, setTitle)}
            placeholder='Enter the title'
            error={titleError}
          />
          <InputField
            label="Description:"
            id="title-update"
            value={description}
            onChange={(evt) => onInputChange(evt, setDescription)}
            placeholder='Enter the description'
            error={descriptionError}
          />
          <InputField
            label="Steps to Reproduce:"
            id="steps-to-reproduce"
            value={stepsToReproduce}
            onChange={(evt) => onInputChange(evt, setStepsToReproduce)}
            placeholder='Enter the steps to reproduce'
            error={stepsToReproduceError}
          />
          <div className="mb-3">
            <label htmlFor="classification" className="form-label">
              Classification:
            </label>
            <DropDown
              id="classification"
              name="classification"
              className="form-select"
              value={bug.bugClass}
              onChange={(evt) => onInputChange(evt, setBug)}
            >
              <option value="">All</option>
              <option value="approved">Approved</option>
              <option value="unapproved">Unapproved</option>
              <option value="duplicate">Duplicate</option>
            </DropDown>
          </div>
          <div className="mb-3">
            <label htmlFor="closed" className="form-label">
              Open or Closed:
            </label>
            <DropDown
              id="closed"
              name="closed"
              className="form-select"
              value={closed}
              onChange={(evt) => setClosed(evt.currentTarget.value)}
            >
              <option value="false">Open</option>
              <option value="true">Closed</option>
            </DropDown>
          </div>
          <InputField
            label="Assigned To:"
            id="assignedTo"
            value={assignedTo}
            onChange={(evt) => onInputChange(evt, setAssignedTo)}
            placeholder='Enter assigned user'
          />
          {error && <div className="text-danger mb-1">{'Please fix the errors above'}</div>}
          {!pending && <button className="btn btn-primary me-3" type="submit" onClick={(evt) => onClickSubmit(evt)}>
            Update Bug
          </button>}
          {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
        </form>
      )}
    </div>
  );
}

export default BugEditor;
