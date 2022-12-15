import { useState, useEffect } from 'react';
import BugListItem from './BugListItem';
import axios from 'axios';
import _ from 'lodash';
import DropDown from './DropDown';
import DefaultCheckedBox from './DefaultCheckedBox';
import { FaList } from 'react-icons/fa';

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

  function onClickSubmit(evt) {
    evt.preventDefault();
    setPending(true);
    setError('');
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
        keywords: keywords,
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
  }

  return (
    <div className="container">
      <div className="" id="bug-list-component">
        <div className='d-flex align-items-center'>
          <h3 className='me-3'>{<FaList />}</h3>
          <h3 className="mb-2 fs-1">Bug List</h3>
        </div>
        {auth?.payload.fullName && <h5 className="mb-3 fs-5">Welcome {auth?.payload.fullName}</h5>}
        <div className="d-flex flex-wrap align-items-center justify-content-between m-2 mb-3">
          <div className="d-flex flex-column">
            <label htmlFor="classification" className="form-label mb-0">
              Classification:
            </label>
            <DropDown
              className="form-select form-select-sm"
              value={bugClass}
              onChange={(evt) => onInputChange(evt, setBugClass)}
            >
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
                size="1"
                onChange={(evt) => onInputChange(evt, setMaxAge)}
              />
            </div>
          </div>
          <div className="d-flex flex-column align-self-start mb-3">
            <label htmlFor="classification" className="form-label mb-0">
              Sort By:
            </label>
            <div className="">
              <DropDown
                className="form-select form-select-sm"
                value={sortBy}
                onChange={(evt) => onInputChange(evt, setSortBy)}
              >
                <option value=""></option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Title</option>
                <option value="assignedTo">Assigned To</option>
                <option value="createdBy">Reported By</option>
              </DropDown>
            </div>
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
        {pending && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {error && <div className="text-danger fs-4 mb-2">{error}</div>}
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
