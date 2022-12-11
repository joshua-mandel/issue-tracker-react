import { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import InputField from './InputField';

function RegisterForm({ onLogin, showError }) {
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressConfirm, setEmailAddressConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailConfirmError, setEmailConfirmError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [givenNameError, setGivenNameError] = useState('');
  const [familyNameError, setFamilyNameError] = useState('');

  function onClickSubmit(evt) {
    evt.preventDefault();
    setEmailError(
      !emailAddress ? 'Email is required.' : !emailAddress.includes('@') ? 'Email must include an @ sign.' : ''
    );
    setEmailConfirmError(
      !emailAddressConfirm
        ? 'Please confirm email.'
        : !emailAddressConfirm.includes('@')
        ? 'Email must include an @ sign.'
        : emailAddress !== emailAddressConfirm
        ? 'Emails must match'
        : ''
    );
    setPasswordError(
      !password ? 'Password is required.' : password.length < 8 ? 'Password must be at least 8 characters.' : ''
    );
    setPasswordConfirmError(
      !passwordConfirm
        ? 'Please confirm password'
        : passwordConfirm.length < 8
        ? 'Password must be at least 8 characters.'
        : password !== passwordConfirm
        ? 'Passwords must match.'
        : ''
    );
    setGivenNameError(!givenName ? 'Please enter a first name.' : '');
    setFamilyNameError(!familyName ? 'Please enter a last name.' : '');
    setError('');
    setSuccess('');

    if (emailError || passwordError) {
      setError('Please fix errors above.');
      showError('Please fix errors above.');
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/user/register`, {
      method: 'post',
      data: { emailAddress, password, givenName, familyName },
    })
      .then((res) => {
        console.log(res);
        setSuccess(res.data.message);
        const authPayload = jwt_decode(res.data.token);
        const auth = {
          emailAddress: emailAddress,
          userId: res.data.userId,
          token: res.data.token,
          payload: authPayload,
        };
        console.log(auth);
        onLogin(auth);
      })
      .catch((err) => {
        console.error(err);
        showError('Please fix the errors.');
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
    <div className="container col-md-6">
      <h1>Register</h1>
      <form>
        <InputField
          label="Email"
          id="emailAddress"
          autoComplete="email"
          placeholder="name@example.com"
          value={emailAddress}
          onChange={(evt) => onInputChange(evt, setEmailAddress)}
          error={emailError}
        />
        <InputField
          label="Confirm Email"
          id="emailAddress"
          autoComplete="email"
          placeholder="Same as above"
          value={emailAddressConfirm}
          onChange={(evt) => onInputChange(evt, setEmailAddressConfirm)}
          error={emailConfirmError}
        />
        <InputField
          label="Password"
          id="LoginForm-password"
          type="password"
          placeholder=""
          value={password}
          onChange={(evt) => onInputChange(evt, setPassword)}
          error={passwordError}
        />
        <InputField
          label="Confirm Password"
          id="LoginForm-password-confirm"
          type="password"
          placeholder=""
          value={passwordConfirm}
          onChange={(evt) => onInputChange(evt, setPasswordConfirm)}
          error={passwordConfirmError}
        />
        <InputField
          label="First Name"
          id="LoginForm-password-confirm"
          type="text"
          placeholder="John"
          value={givenName}
          onChange={(evt) => onInputChange(evt, setGivenName)}
          error={givenNameError}
        />
        <InputField
          label="Last Name"
          id="LoginForm-password-confirm"
          type="text"
          placeholder="Doe"
          value={familyName}
          onChange={(evt) => onInputChange(evt, setFamilyName)}
          error={familyNameError}
        />

        <div className="mb-3 d-flex align-items-center">
          <button className="btn btn-primary me-3" type="submit" onClick={(evt) => onClickSubmit(evt)}>
            Register Now
          </button>
          <div>
            <div>Already have an account?</div>
            <Link to="/login">Login Here</Link>
          </div>
        </div>
        {error && <div className="text-danger mb-3">{error}</div>}
      </form>
    </div>
  );
}

export default RegisterForm;
