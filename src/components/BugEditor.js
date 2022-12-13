import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InputField from './InputField';
import DropDown from './DropDown';
import axios from 'axios';
import _ from 'lodash';
import CommentListItem from './CommentListItem';

function BugEditor({ auth, showError, showSuccess }) {
  const { bugId } = useParams();
  const [bug, setBug] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [assignedTo, setAssignedTo] = useState();
  const [bugClass, setBugClass] = useState('');
  const [closed, setClosed] = useState();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(true);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [assignError, setAssignError] = useState('');

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
          setBugClass(res.data.bugClass);
          if (res.data.closed) {
            setClosed('close');
          } else {
            setClosed('open');
          }
          setAssignedTo(res.data.assignedToUserId);
          setComments(res.data.comments);
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

  function onClickSubmitComment(evt) {
    evt.preventDefault();
    setPending(true);
    setError('');
    setSuccess('');
    setCommentError('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/comment/new`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: {
        commentText: newComment,
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(`Bug: `, bug);
        setPending(false);
        if (_.isObject(res.data)) {
          // setBug(res.data);
          window.location.reload(false);
          showSuccess(`Added Comment: ${newComment}`);
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
        setCommentError('Comment cannot be blank.');
        showError('Please fix the errors.');
      });
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

  function onClickSubmitOpenClose(evt) {
    evt.preventDefault();
    setPending(true);
    setError('');
    setSuccess('');
    setCommentError('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/close`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: {
        closed: closed,
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

  function onClickSubmitBugClass(evt) {
    evt.preventDefault();
    setPending(true);
    setError('');
    setSuccess('');
    setCommentError('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/classify`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: {
        bugClass: bugClass,
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(`Bug: `, bug);
        setPending(false);
        if (_.isObject(res.data)) {
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

  function onClickSubmitAssignedTo(evt) {
    evt.preventDefault();
    setPending(true);
    setError('');
    setSuccess('');
    setAssignError('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/assign`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: {
        assignedToUserId: assignedTo,
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(`Bug: `, bug);
        setPending(false);
        if (_.isObject(res.data)) {
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
        setAssignError('Please enter a valid User Id');
        showError('Please fix the errors.');
      });
  }

  return (
    <div className="container col-md-6">
      <h3 className="mb-2">Bug Editor</h3>
      <h5 className="mb-2">Welcome {auth?.payload.fullName}</h5>
      {bug && (
        <>
          <form>
            <h4 className="mb-3">BugId: {bugId}</h4>
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
            <div className="mb-3">
              {!pending && (
                <button className="btn btn-primary me-3" type="submit" onClick={(evt) => onClickSubmit(evt)}>
                  Update Bug
                </button>
              )}
              {pending && (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
          </form>
          <form>
            <div className="mb-3">
              <h6 className="fs-3">Comments</h6>
              {comments && _.map(comments, (comment) => <CommentListItem key={comment._id} comment={comment} />)}
              {!comments && <div>No Comments Yet</div>}
            </div>
            <div className="mb-3 input-group">
              <input
                className="form-control"
                label="Add a Comment:"
                id="assignedTo"
                value={newComment}
                onChange={(evt) => onInputChange(evt, setNewComment)}
                placeholder="Enter a comment"
              />
              <button className="btn btn-primary" type="submit" onClick={(evt) => onClickSubmitComment(evt)}>
                Add Comment
              </button>
            </div>
            {commentError && <div className="text-danger mb-3">{'Comment cannot be empty'}</div>}
          </form>
          <form>
            <div className="mb-3">
              <label htmlFor="closed" className="form-label">
                Open or Closed:
              </label>
              <div className="input-group">
                <DropDown
                  id="closed"
                  name="closed"
                  className="form-select"
                  value={closed}
                  onChange={(evt) => onInputChange(evt, setClosed)}
                >
                  <option value="open">Open</option>
                  <option value="close">Closed</option>
                </DropDown>
                <button className="btn btn-primary" type="submit" onClick={(evt) => onClickSubmitOpenClose(evt)}>
                  Update
                </button>
              </div>
            </div>
          </form>
          <form className="mb-3">
            <label for="assignedTo" class="form-label">
              Assigned To:
            </label>
            <div className="input-group">
              <input
                label="Assigned To:"
                id="assignedTo"
                className="form-control"
                value={assignedTo}
                onChange={(evt) => onInputChange(evt, setAssignedTo)}
                placeholder="Enter assigned user"
              />
              <button className="btn btn-primary" type="submit" onClick={(evt) => onClickSubmitAssignedTo(evt)}>
                Assign User
              </button>
            </div>
            {assignError && <div className="text-danger mb-3">{'Please enter a valid User Id'}</div>}
          </form>
          <form>
            <div className="mb-3">
              <label htmlFor="classification" className="form-label">
                Classification:
              </label>
              <div className="input-group">
                <DropDown
                  id="classification"
                  name="classification"
                  className="form-select"
                  value={bugClass}
                  onChange={(evt) => onInputChange(evt, setBugClass)}
                >
                  <option value="unclassified">Unclassified</option>
                  <option value="approved">Approved</option>
                  <option value="unapproved">Unapproved</option>
                  <option value="duplicate">Duplicate</option>
                </DropDown>
                <button className="btn btn-primary" type="submit" onClick={(evt) => onClickSubmitBugClass(evt)}>
                  Classify
                </button>
              </div>
            </div>
          </form>
          {error && <div className="text-danger mb-3">{'Please fix the errors above'}</div>}
        </>
      )}
    </div>
  );
}

export default BugEditor;
