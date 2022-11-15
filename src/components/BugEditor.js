import { useParams } from 'react-router-dom';
import { useState } from 'react';

function BugEditor(props) {

  const { id, title, description, bugClass } = useParams();

  const[newTitle, setNewTitle] = useState(title);
  const[newDescription, setNewDescription] = useState(description);
  const[newBugClass, setNewBugClass] = useState(bugClass);


  return (
      <div className="container col-12 col-md-10 col-lg-10 col-xl-10">
        <div className="mt-5" id="login-component">
          <div className="card shadow-2-strong" id="rounded-corner">
            <div className="card-body p-5 text-center">
              <h3 className="mb-1">Bug Editor</h3>
              <h5 className="mb-5">Welcome {props.fullName}</h5>
              <div>Bug Id: {id}</div>
                    <div className="d-flex form-outline mb-4 align-items-center">
                      <label className="me-2 ">Title: </label>
                      <input
                        type="text"
                        id="title-input"
                        className="form-control form-control-lg"
                        onChange={(evt) => setNewTitle(evt.currentTarget.value)}
                        value={newTitle}
                      />
                    </div>
                    <div className="d-flex form-outline mb-4 align-items-center">
                      <label className="me-2 ">Description: </label>
                      <input
                        type="text"
                        id="description-input"
                        className="form-control form-control-lg"
                        onChange={(evt) => setNewDescription(evt.currentTarget.value)}
                        value={newDescription}
                      />
                    </div>
                    <div className="d-flex form-outline mb-4 align-items-center">
                      <label className="me-2 ">BugClass: </label>
                      <input
                        type="text"
                        id="bugClass-input"
                        className="form-control form-control-lg"
                        onChange={(evt) => setNewBugClass(evt.currentTarget.value)}
                        value={newBugClass}
                      />
                    </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default BugEditor;