import { NavLink } from 'react-router-dom';
import smallLogo from '../issue-tracker-logo-sm.png';
import { FaDoorClosed, FaDoorOpen, FaList, FaEdit } from 'react-icons/fa';

function Navbar({ auth, onLogout }) {
  return (
    <header className="navbar navbar-dark bg-dark">
      <nav className="container">
        <div>
          <img className="img-fluid me-4 logo-sm" src={smallLogo} alt="logo" />
          {auth && <span className="navbar-text fs-4-md">{auth.emailAddress}</span>}
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
          {!auth && (
            <ul className="navbar-nav d-flex fs-5 my-2 align-items-end">
              <li className="nav-item">
                
                <NavLink className="nav-link d-flex align-items-center" to="/login">
                <FaDoorOpen className='me-2' />
                    Login
                </NavLink>
              </li>
            </ul>
          )}
          {auth && (
            <ul className="navbar-nav fs-5 my-2">
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center align-items-end">
                <li className="nav-item">
                  <NavLink className="nav-link d-flex align-items-center" to="/bug/list">
                    <FaList className='me-2' />
                    Bug List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link d-flex align-items-center" to="/user/list">
                    <FaList className='me-2' />
                    User List
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link d-flex align-items-center" to="/bug/report">
                    <FaEdit className='me-2' />
                    Report a New Bug
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link d-flex align-items-center" to="/login" onClick={(evt) => onLogout(evt)}>
                    <FaDoorClosed className='me-2' />
                    Logout
                  </NavLink>
                </li>
              </div>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
