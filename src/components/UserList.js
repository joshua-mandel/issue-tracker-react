import { useEffect, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import UserListItem from './UserListItem';
import DropDown from './DropDown';
import { FaList } from 'react-icons/fa';

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
            if (_.isEmpty(res.data)) {
              console.log(res.data);
              setError('No Users found');
              return;
            } else {
              setUsers(res.data);
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
        console.log(res.data);
        setPending(false);
        if (_.isArray(res.data)) {
          if (_.isEmpty(res.data)) {
            console.log(res.data);
            setError('No Users found');
            return;
          } else {
            setUsers(res.data);
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
  }

  return (
    <div className="container">
      <div className="" id="login-component">
      <div className='d-flex align-items-center'>
          <h3 className='me-3'>{<FaList />}</h3>
          <h3 className="mb-2 fs-1">User List</h3>
        </div>
        {auth?.payload.fullName && <h5 className="mb-3 fs-5">Welcome {auth?.payload.fullName}</h5>}
        <div className="d-flex flex-wrap align-items-center justify-content-between m-2 mb-3">
          <div className="d-flex flex-column">
            <label htmlFor="classification" className="form-label mb-0">
              Role:
            </label>
            <DropDown
              className="form-select form-select-sm"
              value={role}
              onChange={(evt) => onInputChange(evt, setRole)}
            >
              <option value="">All</option>
              <option value="Developer">Developer</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="Quality Analyst">Quality Analyst</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Technical Manager">Technical Manager</option>
            </DropDown>
          </div>
          <div className="col-4 col-md-2">
            <div className="input-group input-group-sm mb-2">
              <span className="input-group-text">Min Age</span>
              <input
                type="number"
                value={minAge}
                id="min-age-input"
                className="form-control"
                onChange={(evt) => onInputChange(evt, setMinAge)}
              />
            </div>
            <div className="input-group input-group-sm">
              <span className="input-group-text">Max Age</span>
              <input
                type="number"
                value={maxAge}
                id="min-age-input"
                className="form-control"
                onChange={(evt) => onInputChange(evt, setMaxAge)}
              />
            </div>
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="classification" className="form-label mb-0">
              Sort By:
            </label>
            <DropDown className="form-select form-select-sm" value={sortBy} onChange={(evt) => onInputChange(evt, setSortBy)}>
              <option value=""></option>
              <option value="givenName">Given Name</option>
              <option value="familyName">Family Name</option>
              <option value="role">Role</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </DropDown>
          </div>
          <div className="col-lg-2 col-12 my-2">
            <form>
              <div class="input-group input-group-sm">
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
        {error && <div className="text-danger fs-4 mb-2">{error}</div>}
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
