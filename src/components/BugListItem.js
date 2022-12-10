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
          <h5 className="card-title mb-3">{bug.title}</h5>
          <div className="card-text">
            <div className="mb-2">
              {bug.bugClass === 'approved' && <span className=" badge bg-success me-1">Approved</span>}
              {bug.bugClass === 'unapproved' && <span className=" badge bg-danger me-1">Unapproved</span>}
              {bug.bugClass === 'duplicate' && <span className=" badge bg-danger me-1">Duplicate</span>}
              {bug.bugClass === 'unclassified' && (
                <span className=" badge text-dark bg-warning me-1">Unclassified</span>
              )}
              {bug.closed === true && <span className="badge bg-danger me-1">Closed</span>}
              {bug.closed === false && <span className="badge bg-success me-1">Open</span>}
            </div>
            <div>
              <button
                onClick={handleClick}
                className="btn border border-dark border-1 btn-primary btn-sm px-3 py-0"
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
