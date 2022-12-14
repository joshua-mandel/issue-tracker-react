import { NavLink } from 'react-router-dom';
import smallLogo from '../issue-tracker-logo-sm.png';

function Navbar({ auth, onLogout }) {
  return (
    <header className="navbar navbar-dark bg-dark">
      <nav className="container">
        <div>
          <img className="img-fluid me-4 logo-sm" src={smallLogo} alt="logo" />
          {auth && <span className="navbar-text">{auth.emailAddress}</span>}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" className="collapse navbar-collapse">
          <ul className="navbar-nav d-flex fs-5 my-2">
            {!auth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {auth && (
              <div className="d-flex flex-wrap justify-content-between">
                <li className="nav-item d-flex justify-content-md-center justify-content-end col-12 col-md-3">
                  <NavLink className="nav-link" to="/user/list">
                    User List
                  </NavLink>
                </li>
                <li className="nav-item d-flex justify-content-md-center justify-content-end col-12 col-md-3">
                  <NavLink className="nav-link" to="/bug/list">
                    Bug List
                  </NavLink>
                </li>
                <li className="nav-item d-flex justify-content-md-center justify-content-end col-12 col-md-3">
                  <NavLink className="nav-link" to="/bug/report">
                    Report a New Bug
                  </NavLink>
                </li>
                <li className="nav-item d-flex justify-content-md-center justify-content-end col-12 col-md-3">
                  <NavLink className="nav-link" to="/login" onClick={(evt) => onLogout(evt)}>
                    Logout
                  </NavLink>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
