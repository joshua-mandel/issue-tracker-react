import { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import InputField from './InputField';
import largeLogo from '../issue-tracker-logo.png';

function LoginForm({ onLogin, showError }) {
  const [emailAddress, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function onClickSubmit(evt) {
    evt.preventDefault();
    setError('');
    setSuccess('');

    setEmailError(
      !emailAddress ? 'Email is required.' : !emailAddress.includes('@') ? 'Email must include an @ sign.' : ''
    );
    setPasswordError(
      !password ? 'Password is required.' : password.length < 8 ? 'Password must be at least 8 characters.' : ''
    );

    axios(`${process.env.REACT_APP_API_URL}/api/user/login`, {
      method: 'post',
      data: { emailAddress, password },
    })
      .then((res) => {
        setSuccess(res.data.message);
        const authPayload = jwt_decode(res.data.token);
        const auth = {
          emailAddress: authPayload.emailAddress,
          userId: res.data.userId,
          token: res.data.token,
          payload: authPayload,
        };
        onLogin(auth);
        console.log('authPayload: ', authPayload);
        console.log('auth: ', auth);
      })
      .catch((err) => {
        console.error(err);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x) => <div>{x.message}</div>));
          } else {
            setError(JSON.stringify(resError));
          }
        } else {
          setError(err.message);
          showError(err.message);
        }
      });
  }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

  return (
    <div className='container d-flex flex-column justify-content-center'>
    <div className="d-flex flex-wrap align-items-center justify-content-center mt-5">
      <div className='col-lg-4 col-12 d-flex justify-content-center'>
        <img className="large-logo" src={largeLogo} alt="Large logo" />
      </div>
      <div className="col-lg-4 col-12">
        <h1>Login</h1>
        <form>
          <InputField
            label="Email"
            id="emailAddress"
            autoComplete="email"
            placeholder="name@example.com"
            value={emailAddress}
            onChange={(evt) => onInputChange(evt, setEmail)}
            error={emailError}
          />
          <InputField
            label="Password"
            id="LoginForm-password"
            type="password"
            placeholder=""
            autoComplete="current-password"
            value={password}
            onChange={(evt) => onInputChange(evt, setPassword)}
            error={passwordError}
          />

          <div className="mb-3 d-flex align-items-center">
            <button className="btn btn-lg btn-primary me-3" type="submit" onClick={(evt) => onClickSubmit(evt)}>
              Login
            </button>
            <div>
              <div>Don't have an account yet?</div>
              <Link to="/register">Register Here</Link>
            </div>
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
        </form>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;
