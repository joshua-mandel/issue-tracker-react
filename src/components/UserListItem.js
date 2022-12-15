import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { FaEdit, FaUserAlt, FaEnvelope } from 'react-icons/fa';

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
          <div className="d-flex flex-column">
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <FaUserAlt className="me-2 mb-2 fs-5" />
                <h5 className="card-title mb-1 fs-4">{user.fullName}</h5>
              </div>
              <div className="d-flex align-items-center">
                <FaEnvelope className="me-2 mb-2" />
                <h6 className="card-text mb-2">{user.emailAddress}</h6>
              </div>
            </div>
            <div>
              {roleArray && (
                <div className="d-flex flex-column col-8">
                  {_.map(user.role, (role) => (
                    <span className=" badge bg-primary mb-1">{role}</span>
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
                className="btn border border-dark border-1 btn-primary btn-sm  p-2"
                type="button"
              >
                <Link className="text-white text-decoration-none d-flex align-items-center" to={`/user/${user._id}`}>
                  <FaEdit className="me-1" />
                  <div>Edit User</div>
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
