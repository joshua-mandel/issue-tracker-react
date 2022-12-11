import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import { useEffect, useState } from 'react';

function UserListItem({ user }) {
  const [roleArray, setRoleArray] = useState(false);
  const role = user.role;

  useEffect(() => {
    if (Array.isArray(role)) {
      setRoleArray(true);
    } else {
      setRoleArray(false);
    }
  }, [user, role]);

  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <div className="col-md-6 col-12 p-2">
      <div className="card h-100 bg-light">
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="">
            <h5 className="card-title mb-1">{user.fullName}</h5>
            <h6 className="card-text mb-2">{user.emailAddress}</h6>
            <div>
              {roleArray && (
                <div className="d-flex flex-wrap">
                  {_.map(user.role, (role) => (
                    <span className=" badge bg-primary me-1 mb-1">{role}</span>
                  ))}
                </div>
              )}
              {!roleArray && role && <span className=" badge bg-primary">{role}</span>}
              {!role && <span className=" badge bg-danger">No Role</span>}
            </div>
          </div>
          <div className="card-text">
            <div>
              <button
                onClick={handleClick}
                className="btn border border-dark border-1 btn-primary btn-md p-1"
                type="button"
              >
                <Link className="text-white text-decoration-none" to={`/user/${user._id}`}>
                  Edit User
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div>Created {moment(user.createdOn).fromNow()}</div>
        </div>
      </div>
    </div>
  );
}

export default UserListItem;
