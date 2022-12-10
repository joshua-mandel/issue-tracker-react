import { useEffect, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import UserListItem from './UserListItem';

function UserList({ auth }) {
  const [pending, setPending] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState(null);

  useEffect(() => {
    setPending(true);
    setError('');
    setTimeout(() => {axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
      method: 'get',
      params: { pageSize: 1000 },
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPending(false);
        if (_.isArray(res.data)) {
          setUsers(res.data);
        } else {
          setError('Expected an array.');
        }
      })
      .catch((err) => {
        console.error(err);
        setPending(false);
        setError(err.message);
      });
    }, 250);
  }, [auth]);

  return (
    <div className="container">
    <div className="" id="login-component">
      <h3 className="mb-1">User List</h3>
      {auth?.payload.fullName && <h5 className="mb-3">Welcome {auth?.payload.fullName}</h5>}
      {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <div className="text-danger mb-2">{error}</div>}
      {!pending && !error && !_.isEmpty(users) && (
        <div className="d-flex flex-wrap">
          {_.map(users, (user) => (
            <UserListItem key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  </div>
  );
}

export default UserList;
