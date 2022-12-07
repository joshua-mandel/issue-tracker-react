import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function BugListItem({ bug }) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate(`/bug-editor/${bug.id}/${bug.title}/${bug.description}/${bug.bugClass}`);
  }

  return (
    <div className="col-3 p-1">
      <div className="card h-100 bg-light">
        <div className="card-body">
          <h5 className="card-title mb-1">{bug.title}</h5>
          <div className="">
            <div className="card-text">
              <div className="mb-2">
                <p className="d-inline-block mt-2 mb-0 me-1">Tags:</p>
                {bug.bugClass === 'approved' && <span className=" badge bg-success me-1">{bug.bugClass}</span>}
                {bug.bugClass === 'unapproved' && <span className=" badge bg-danger me-1">{bug.bugClass}</span>}
                {bug.bugClass === 'duplicate' && <span className=" badge bg-danger me-1">{bug.bugClass}</span>}
                {bug.bugClass === 'unclassified' && <span className=" badge bg-warning me-1">{bug.bugClass}</span>}
                {bug.closed === true && <span className="badge bg-danger me-1">Closed</span>}
                {bug.closed === false && <span className="badge bg-success me-1">Open</span>}
              </div>
              <div>
                <button
                  onClick={handleClick}
                  className="btn border border-dark border-2 btn-secondary btn-sm px-5 py-0"
                  type="button"
                >
                  Edit Bug
                </button>
              </div>
            </div>
          </div>
        </div>
        {bug.createdOn && bug.createdDate && <div class="card-footer">{moment(bug.createdOn).fromNow()}</div>}
        {bug.createdDate && !bug.createdOn && <div class="card-footer">{moment(bug.createdDate).fromNow()}</div>}
        {bug.createdOn && !bug.createdDate && <div class="card-footer">{moment(bug.createdOn).fromNow()}</div>}
      </div>
    </div>
  );
}

export default BugListItem;
