import '../styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { UserList } from './UserList';

function RegisterForm(props) {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (props.email && props.password && props.fullName) {
      console.log('register success!');
      props.setIsLoggedIn(true);
      navigate('/bug-list');
    } else {
      console.log('register failed!');
      props.setIsLoggedIn(false);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
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
                  <h3 className="mb-5">Register</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex form-outline mb-4 align-items-center">
                      <label className="me-2 ">Email: </label>
                      <input
                        id="email-input"
                        name="email"
                        type="email"
                        onChange={(evt) => props.setEmail(evt.currentTarget.value)}
                        autoComplete="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        value={props.email}
                      />
                    </div>
                    <div className="d-flex form-outline mb-4 align-items-center">
                      <label className="me-2 ">Password: </label>
                      <input
                        type="password"
                        id="password-input"
                        onChange={(evt) => props.setPassword(evt.currentTarget.value)}
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={props.password}
                      />
                    </div>
                    <div className="d-flex form-outline mb-4 align-items-center">
                      <label className="me-2 ">Full Name: </label>
                      <input
                        type="text"
                        id="text-input"
                        onChange={(evt) => props.setFullName(evt.currentTarget.value)}
                        className="form-control form-control-lg"
                        placeholder="Full Name"
                        value={props.fullName}
                      />
                    </div>
                    <div>
                      {props.isLoggedIn ? (
                        <div className="green">Registered!</div>
                      ) : (
                        <div className="red">Please Fill Out All Info</div>
                      )}
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                      Register Account
                    </button>
                    <div className="mb-4"></div>
                    <button onClick={handleClick} className="btn btn-secondary btn-sm btn-block" type="button">
                      Already have an Account? Go to Log In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
