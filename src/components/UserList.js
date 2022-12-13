import { useEffect, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import UserListItem from './UserListItem';
import DropDown from './DropDown';
import DefaultCheckedBox from './DefaultCheckedBox';

function UserList({ auth }) {
  const [pending, setPending] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState(null);
  const [sortBy, setSortBy] = useState();
  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();
  const [role, setRole] = useState();
  const [keywords, setKeywords] = useState();

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  useEffect(() => {
    setPending(true);
    setError('');
    setTimeout(() => {
      axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
        method: 'get',
        params: { pageSize: 1000, sortBy: sortBy, minAge: minAge, maxAge: maxAge, role: role },
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
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
  }, [auth, sortBy, role, minAge, maxAge]);

  function onClickSubmit(evt) {
    evt.preventDefault();
    setPending(true);
    setError('');
    axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
      method: 'get',
      params: { pageSize: 1000, sortBy: sortBy, minAge: minAge, maxAge: maxAge, role: role, keywords: keywords },
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
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
  }

  return (
    <div className="container">
      <div className="" id="login-component">
        <h3 className="mb-1">User List</h3>
        {auth?.payload.fullName && <h5 className="mb-3">Welcome {auth?.payload.fullName}</h5>}
        <div className="d-flex flex-wrap align-items-center justify-content-between m-2">
          <div className="d-flex align-items-end">
            <label htmlFor="classification" className="form-label me-2">
              Classification:
            </label>
            <DropDown className="form-select" value={role} onChange={(evt) => onInputChange(evt, setRole)}>
              <option value="">All</option>
              <option value="Developer">Developer</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="Quality Analyst">Quality Analyst</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Technical Manager">Technical Manager</option>
            </DropDown>
          </div>
          <div className="col-2">
            <div className="d-flex align-items-end mb-2">
              <label htmlFor="classification" className="form-label col-5">
                Min Age:
              </label>
              <input
                type="number"
                value={minAge}
                id="min-age-input"
                className="form-control"
                onChange={(evt) => onInputChange(evt, setMinAge)}
              />
            </div>
            <div className="d-flex align-items-end">
              <label htmlFor="classification" className="form-label col-5">
                Max Age:
              </label>
              <input
                type="number"
                value={maxAge}
                id="min-age-input"
                className="form-control"
                onChange={(evt) => onInputChange(evt, setMaxAge)}
              />
            </div>
          </div>
          <div className="d-flex align-items-end">
            <label htmlFor="classification" className="form-label col-4 me-2">
              Sort By:
            </label>
            <div className="col-9">
              <DropDown className="form-select" value={sortBy} onChange={(evt) => onInputChange(evt, setSortBy)}>
                <option value=""></option>
                <option value="givenName">Given Name</option>
                <option value="familyName">Family Name</option>
                <option value="role">Role</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </DropDown>
            </div>
          </div>
          <div className="col-lg-3 col-12 my-2">
            <form>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Keywords"
                  value={keywords}
                  onChange={(evt) => onInputChange(evt, setKeywords)}
                  aria-label="Recipient's username"
                  aria-describedby="button-search"
                />
                <button
                  class="btn btn-outline-primary"
                  type="submit"
                  id="button-search"
                  onClick={(evt) => onClickSubmit(evt)}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {error && <div className="text-danger mb-2">{error}</div>}
        {_.isEmpty(users) && <div className="text-danger">No Users Found</div>}
        {!pending && !error && !_.isEmpty(users) && (
          <div className="d-flex flex-wrap">
            {_.map(users, (user) => (
              <UserListItem key={user._id} user={user} />
            ))}
          </div>
        )}
        {pending && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
