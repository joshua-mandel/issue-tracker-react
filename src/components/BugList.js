import { useState, useEffect } from 'react';
import BugListItem from './BugListItem';
import axios from 'axios';
import _ from 'lodash';
import DropDown from './DropDown';
import DefaultCheckedBox from './DefaultCheckedBox';
import InputField from './InputField';

function BugList({ auth }) {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(true);
  const [bugs, setBugs] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [bugClass, setBugClass] = useState('');
  const [closed, setClosed] = useState('');
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState(true);
  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();
  const [sortBy, setSortBy] = useState();

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  function handleClosedCheckbox(evt) {
    if (evt.currentTarget.checked) {
      setClosed('true');
    } else {
      setClosed('');
    }
    console.log(closed);
  }

  useEffect(() => {
    setPending(true);
    setError('');
    setTimeout(() => {
      axios(`${process.env.REACT_APP_API_URL}/api/bug/list`, {
        method: 'get',
        params: {
          pageSize: 1000,
          bugClass: bugClass,
          closed: closed,
          open: open,
          minAge: minAge,
          maxAge: maxAge,
          sortBy: sortBy,
        },
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
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
    }, 250);
  }, [auth, bugClass, closed, open, minAge, maxAge, sortBy]);

  return (
    <div className="container">
      <div className="" id="bug-list-component">
        <h3 className="mb-1">Bug List</h3>
        {auth?.payload.fullName && <h5 className="mb-3">Welcome {auth?.payload.fullName}</h5>}
        <div className="d-flex flex-wrap align-items-center justify-content-between m-2">
          <div className="d-flex align-items-end">
            <label htmlFor="classification" className="form-label me-2">
              Classification:
            </label>
            <DropDown className="form-select" value={bugClass} onChange={(evt) => onInputChange(evt, setBugClass)}>
              <option value="">All</option>
              <option value="unclassified">Unclassified</option>
              <option value="approved">Approved</option>
              <option value="unapproved">Unapproved</option>
              <option value="duplicate">Duplicate</option>
            </DropDown>
          </div>
          <div className="d-flex flex-column">
            <div className="form-check">
              <DefaultCheckedBox
                className="form-check-input"
                value={open}
                setChecked={setChecked}
                checked={checked}
                open={open}
                setOpen={setOpen}
              />
              <label className="form-check-label">Open</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                value={closed}
                onChange={(evt) => handleClosedCheckbox(evt)}
              />
              <label className="form-check-label">Closed</label>
            </div>
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
            <div className='col-9'>
              <DropDown className="form-select" value={sortBy} onChange={(evt) => onInputChange(evt, setSortBy)}>
                <option value=""></option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Title</option>
                <option value="assignedTo">Assigned To</option>
                <option value="createdBy">Reported By</option>
              </DropDown>
            </div>
          </div>
          <div className="col-lg-3 col-12 my-2">
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
              <button class="btn btn-outline-primary" type="button" id="button-search">
                Search
              </button>
            </div>
          </div>
        </div>
        {pending && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {error && <div className="text-danger mb-2">{error}</div>}
        {!pending && !error && !_.isEmpty(bugs) && (
          <div className="d-flex flex-wrap">
            {_.map(bugs, (bug) => (
              <BugListItem key={bug._id} bug={bug} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BugList;
