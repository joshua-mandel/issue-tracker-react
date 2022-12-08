import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InputField from './InputField';
import axios from 'axios';

function BugEditor({ auth, showError }) {
  const { bugId } = useParams();
  const [bug, setBug] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [stepsToReproduce, setStepsToReproduce] = useState();
  const [classification, setClassification] = useState();
  const [assignedTo, setAssignedTo] = useState();
  const [closed, setClosed] = useState();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(true);

  function handleClick(e) {
    e.preventDefault();
  }

  useEffect(() => {
    setPending(true);
    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPending(false);
        setBug(res.data);
      })
      .catch((err) => {
        console.log(err);
        setPending(false);
        setError(err.message);
        showError(err.message);
      });
  }, [auth, showError, bugId]);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  return (
    <div className="container">
      <h3 className="mb-2">Bug Editor</h3>
      <h5 className="mb-4">Welcome {auth.payload.fullName}</h5>
      {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <div className="text-danger mb-2">{error}</div>}
      {bug && (
        <form>
          <div>BugId: {bugId}</div>
          <InputField
          label="Title:"
          id="title-update"
          autoComplete=""
          value={title}
          onChange={(evt) => onInputChange(evt, setTitle)}
          error={error}
        />
          <div>Title: {bug.title}</div>
          <div>Description: {bug.description}</div>
          <div>BugClass: {bug.bugClass}</div>
          <div>Assigned To: {bug.assignedTo}</div>
          <div>Closed: {bug.closed.toString()}</div>
        </form>
      )}
    </div>
  );
}

export default BugEditor;
