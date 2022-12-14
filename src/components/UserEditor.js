import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import DropDown from './DropDown';
import axios from 'axios';
import _ from 'lodash';

function UserEditor({ auth, showError, showSuccess }) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(true);
  const [passwordError, setPasswordError] = useState();

  const navigate = useNavigate();

  const givenNameError = !givenName ? 'Please include a first name.' : '';

  const familyNameError = !familyName ? 'Please include a first name.' : '';

  const emailAddressError = !emailAddress ? 'Please include your email' : '';

  useEffect(() => {
    setPending(true);
    setTimeout(() => {
      axios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
        method: 'get',
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setPending(false);
          setUser(res.data);
          setGivenName(res.data.givenName);
          setFamilyName(res.data.familyName);
          setEmailAddress(res.data.emailAddress);
          setRole(res.data.role);
        })
        .catch((err) => {
          console.log(err);
          setPending(false);
          setError(err.message);
          showError(err.message);
        });
    }, 250);
  }, [auth, showError, userId]);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  function onClickSubmit(evt) {
    evt.preventDefault();
    setRole([role]);
    setPending(true);
    setError('');
    setSuccess('');
    axios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: {
        givenName: givenName,
        familyName: familyName,
        emailAddress: emailAddress,
        role: role,
      },
    })
      .then((res) => {
        console.log(`User: `, user);
        setPending(false);
        if (_.isObject(res.data)) {
          navigate('/user/list');
          showSuccess(`user with id: ${userId} updated`);
        } else {
          setError('Expected an object');
          showError(error + ' Expected an object');
        }
      })
      .catch((err) => {
        console.log(`User: `, user);
        console.error(err);
        setPending(false);
        setError(err.message);
        showError('Please fix the errors.');
      });
  }

  function onClickSubmitPassword(evt) {
    evt.preventDefault();
    setRole([role]);
    setPending(true);
    setError('');
    setPasswordError('');
    setSuccess('');
    axios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: {
        password: password,
      },
    })
      .then((res) => {
        console.log(`User: `, user);
        setPending(false);
        if (_.isObject(res.data)) {
          navigate('/user/list');
          showSuccess(`user with id: ${userId} updated`);
        } else {
          setError('Expected an object');
          showError(error + ' Expected an object');
        }
      })
      .catch((err) => {
        setPasswordError('Password must be 8 characters');
        console.error(err);
        setPending(false);
        setError(err.message);
        showError('Please fix the errors.');
      });
  }

  return (
    <div className="container col-md-6">
      <h3 className="mb-2 fs-1">User Editor</h3>
      <h5 className="mb-2 fs-4">Welcome {auth?.payload.fullName}</h5>
      {user && (
        <>
          <form>
            <div className="mb-3 fs-5">UserId: {userId}</div>
            <InputField
              label="First Name:"
              id="given-name-update"
              value={givenName}
              onChange={(evt) => onInputChange(evt, setGivenName)}
              placeholder="John"
              error={givenNameError}
            />
            <InputField
              label="Last Name:"
              id="family-name-update"
              value={familyName}
              onChange={(evt) => onInputChange(evt, setFamilyName)}
              placeholder="Doe"
              error={familyNameError}
            />
            <InputField
              label="Email Address:"
              id="email-address-update"
              value={emailAddress}
              onChange={(evt) => onInputChange(evt, setEmailAddress)}
              placeholder="name@example.com"
              error={emailAddressError}
            />
            <div className="mb-3">
              <label htmlFor="role" className="form-label fs-5">
                Role:
              </label>
              <DropDown
                id="role-update"
                name="role"
                className="form-select"
                value={role}
                onChange={(evt) => onInputChange(evt, setRole)}
              >
                <option value="">No Role</option>
                <option value="Developer">Developer</option>
                <option value="Quality Analyst">Quality Analyst</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Technical Manager">Technical Manager</option>
              </DropDown>
            </div>
            <div className="mb-4">
              {!pending && (
                <button className="btn btn-primary mb-3 col-12" type="submit" onClick={(evt) => onClickSubmit(evt)}>
                  Update User
                </button>
              )}
              {pending && (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
          </form>
          <form>
          <h5 className="mb-3 fs-4">Set a New Password</h5>
            <div className="input-group">
              <input
                className="form-control"
                label="Password:"
                type="password"
                id="password-update"
                value={password}
                onChange={(evt) => onInputChange(evt, setPassword)}
                placeholder="Password"
              />
              <button className="btn btn-primary" type="submit" onClick={(evt) => onClickSubmitPassword(evt)}>
                Update Password
              </button>
            </div>
            {passwordError && <div className="text-danger mb-3">{'Passwords need at least 8 characters'}</div>}
          </form>
          {error && <div className="text-danger mb-3">{'Please fix the errors above'}</div>}
        </>
      )}
    </div>
  );
}

export default UserEditor;
