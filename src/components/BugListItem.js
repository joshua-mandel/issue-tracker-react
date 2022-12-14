import { Link } from 'react-router-dom';
import moment from 'moment';

function BugListItem({ bug }) {
  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <div className="col-xl-3 col-md-6 col-12 p-2">
      <div className="card h-100 bg-light">
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title mb-4 fs-4">{bug.title}</h5>
          <div className="card-text d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column col-4">
              {bug.closed === true && <span className="badge text-white bg-danger mb-2">CLOSED</span>}
              {bug.closed === false && <span className="badge text-white bg-success text-black mb-2">OPEN</span>}
              {bug.bugClass === 'approved' && <span className=" badge text-white bg-success">APPROVED</span>}
              {bug.bugClass === 'unapproved' && <span className=" badge text-white bg-danger">UNAPPROVED</span>}
              {bug.bugClass === 'duplicate' && <span className=" badge text-white bg-danger">DUPLICATE</span>}
              {bug.bugClass === 'unclassified' && (
                <span className=" badge text-dark bg-warning">UNCLASSIFIED</span>
              )}
            </div>
            <div>
              <button
                onClick={handleClick}
                className="btn border border-dark border-1 btn-primary btn-sm p-2"
                type="button"
              >
                <Link className="text-white text-decoration-none" to={`/bug/${bug._id}`}>
                  Edit Bug
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="card-footer">
          {bug.createdOn && bug.createdDate && <div>Created {moment(bug.createdOn).fromNow()}</div>}
          {bug.createdDate && !bug.createdOn && <div>Created {moment(bug.createdDate).fromNow()}</div>}
          {bug.createdOn && !bug.createdDate && <div>Created {moment(bug.createdOn).fromNow()}</div>}
          by
          {bug.createdBy && <span> {bug.createdBy}</span>}
        </div>
      </div>
    </div>
  );
}

export default BugListItem;
