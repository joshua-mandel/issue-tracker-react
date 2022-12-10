import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InputField from './InputField';
import DropDown from './DropDown';
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
        })
        .catch((err) => {
          console.log(err);
          setPending(false);
          setError(err.message);
          showError(err.message);
        });
    }, 0);
  }, [auth, showError, bugId]);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  return (
    <div className="container col-md-6">
      <h3 className="mb-2">Bug Editor</h3>
      <h5 className="mb-2">Welcome {auth?.payload.fullName}</h5>
      {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <div className="text-danger mb-1">{error}</div>}
      {bug && (
        <form>
          <h4 className="mb-3">BugId: {bugId}</h4>
          <InputField
            label="Title:"
            id="title-update"
            value={bug.title}
            onChange={(evt) => onInputChange(evt, setBug)}
            error={error}
          />
          <InputField
            label="Description:"
            id="title-update"
            value={bug.description}
            onChange={(evt) => onInputChange(evt, setBug)}
            error={error}
          />
          <InputField
            label="Steps to Reproduce:"
            id="steps-to-reproduce"
            value={bug.stepsToReproduce}
            onChange={(evt) => onInputChange(evt, setBug)}
            error={error}
          />
          <div className="mb-3">
            <label htmlFor="classification" className="form-label">
              Classification:
            </label>
            <DropDown
              id="classification"
              name="classification"
              className="form-select"
              value={classification}
              onChange={(evt) => setClassification(evt.currentTarget.value)}
            >
              <option value="">All</option>
              <option value="Approved">Approved</option>
              <option value="Unapproved">Unapproved</option>
              <option value="Duplicate">Duplicate</option>
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
              <option value="Closed">Closed</option>
            </DropDown>
          </div>
          <InputField
            label="Assigned To:"
            id="assignedTo"
            value={assignedTo}
            onChange={(evt) => onInputChange(evt, setAssignedTo)}
            error={error}
          />
        </form>
      )}
    </div>
  );
}

export default BugEditor;
