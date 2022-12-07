import { useEffect, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { UserListItem } from './UserListItem';

export function UserList({ auth }) {
  const [pending, setPending] = useState(true);
  const [error, setError] = useState('');
  const [items, setItems] = useState(null);

  useEffect(() => {
    setPending(true);
    setError('');
    axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
      method: 'get',
      params: { pageSize: 1000 },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPending(false);
        if (_.isArray(res.data)) {
          setItems(res.data);
        } else {
          setError('Expected an array.');
        }
      })
      .catch((err) => {
        console.error(err);
        setPending(false);
        setError(err.message);
      });
  }, [auth]);
  return (
    <div>
      <h1>User List</h1>
      {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <div className="text-danger mb-2">{error}</div>}
      {!pending && !error && _.isEmpty(items) && <div className="mb-2">No items found.</div>}
      <div>
        {_.map(items, (item) => (
          <UserListItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
