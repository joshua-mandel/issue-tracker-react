import '../styles/LoginForm.css';
import { Route, Routes, Link } from 'react-router-dom';
import BugList from './BugList';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const admin = {
    email: 'admin@example.com',
    password: 'password',
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(email === admin.email && password === admin.password) {
      console.log('login success!');
      setIsLoggedIn(true);
    } else {
      console.log('login failed!');
      setIsLoggedIn(false);
    }
  }

  return (
    <form id='LoginForm' onSubmit={handleSubmit}>
      <div className="container col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="d-flex justify-content-center mt-5">
          <img className="" src="issue-tracker-logo-sm.png" alt="issue tracker logo" />
        </div>
        <div className="mt-3" id="login-component">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="">
                <div className="card shadow-2-strong" id="rounded-corner">
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Sign in</h3>
                    <div className="d-flex form-outline mb-4 align-items-end">
                      <input
                        id='email-input'
                        name='email'
                        type='email'
                        onChange={(evt) => setEmail(evt.currentTarget.value)}
                        autoComplete='email'
                        className="form-control form-control-lg"
                        placeholder='Email'
                        value={email}
                         />
                    </div>
                    <div className="d-flex form-outline mb-4 align-items-end">
                      <input
                        type="password"
                        id="password-input"
                        onChange={(evt) => setPassword(evt.currentTarget.value)}
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={password}
                      />
                    </div>
                    <div>
                      {(isLoggedIn) ? <div className='green'>Logged In</div> : <div className='red'>Please Log In</div>}
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                      {(isLoggedIn) ? <Link className='nav-link' to="/bug-list">Login</Link> : 'Login'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/bug-list" element={<BugList />} />
        </Routes>
    </form>
  );
}

export default LoginForm;
