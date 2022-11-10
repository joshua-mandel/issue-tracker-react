import '../styles/LoginForm.css';

function RegisterForm() {
  return (
    <div className='container col-12 col-md-8 col-lg-6 col-xl-5'>
      <div className='d-flex justify-content-center mt-5'>
        <img className='' src='issue-tracker-logo-sm.png' alt='issue tracker logo'/>
      </div>
    <div className="mt-5" id="login-component">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="">
            <div className="card shadow-2-strong" id="rounded-corner">
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>
                <div className="d-flex form-outline mb-4 align-items-end">
                  <input type="email" id="email-input" className="form-control form-control-lg" placeholder="Email" />
                </div>
                <div className="d-flex form-outline mb-4 align-items-end">
                  <input
                    type="password"
                    id="email-input"
                    className="form-control form-control-lg"
                    placeholder="Password"
                  />
                  
                </div>
                <button class="btn btn-primary btn-lg btn-block" type="submit">
                  Login
                </button>
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
