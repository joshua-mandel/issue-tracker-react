import '../styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {

  const navigate = useNavigate();

  const admin = {
    email: 'admin@example.com',
    password: 'password',
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(props.email === admin.email && props.password === admin.password) {
      console.log('login success!');
      props.setIsLoggedIn(true);
      props.setFullName('admin');
      navigate('/bug-list');
    } else {
      console.log('login failed!');
      props.setIsLoggedIn(false);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    navigate('/register');
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
                        onChange={(evt) => props.setEmail(evt.currentTarget.value)}
                        autoComplete='email'
                        className="form-control form-control-lg"
                        placeholder='Email'
                        value={props.email}
                         />
                    </div>
                    <div className="d-flex form-outline mb-4 align-items-end">
                      <input
                        type="password"
                        id="password-input"
                        onChange={(evt) => props.setPassword(evt.currentTarget.value)}
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={props.password}
                      />
                    </div>
                    <div>
                      {(props.isLoggedIn) ? <div className='green'>Logged In</div> : <div className='red'>Please Log In</div>}
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                      Log In
                    </button>
                    <div className='mb-4'></div>
                    <button onClick={handleClick} className="btn btn-secondary btn-sm btn-block" type="button">
                      Create an Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
