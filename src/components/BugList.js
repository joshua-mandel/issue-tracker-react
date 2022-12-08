import { useState, useEffect } from 'react';
import BugListItem from './BugListItem';
import axios from 'axios';
import _ from 'lodash';

function BugList(props) {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(true);
  const [bugs, setBugs] = useState(null);

  useEffect(() => {
    setPending(true);
    setError('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/list`, {
      method: 'get',
      params: { pageSize: 1000 },
      headers: {
        authorization: `Bearer ${props.auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPending(false);
        if (_.isArray(res.data)) {
          if (_.isEmpty(res.data)) {
            setError('No bugs found');
            return;
          } else {
            setBugs(res.data);
          }
          
        } else {
          setError('Expected an array.');
        }
      })
      .catch((err) => {
        console.error(err);
        setPending(false);
        setError(err.message);
      });
  }, [props.auth]);

  console.log(props.auth.payload.fullName);

  return (
    <div className="container">
      <div className="" id="login-component">
        <h3 className="mb-1">Bug List</h3>
        {props.auth.payload.fullName && <h5 className="mb-3">Welcome {props.auth.payload.fullName}</h5>}
        {pending && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {error && <div className="text-danger mb-2">{error}</div>}
        {!pending && !error && !_.isEmpty(bugs) && <div className="d-flex flex-wrap">
          {_.map(bugs, (bug) => (
            <BugListItem key={bug.id} bug={bug} />
          ))}
        </div>}
      </div>
    </div>
  );
}

export default BugList;
