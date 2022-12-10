import { NavLink } from 'react-router-dom';
import smallLogo from '../issue-tracker-logo-sm.png';

function Navbar({ auth, onLogout }) {
  return (
    <header className="navbar navbar-expand navbar-dark bg-dark">
      <nav className="container">
        <div>
          <img className="img-fluid me-3 logo-sm p-2" src={smallLogo} alt="logo" />
          {auth && <span className="navbar-text">{auth.emailAddress}</span>}
        </div>
        <ul className="navbar-nav">
          {!auth && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          )}
          {auth && (
            <div className="d-flex">
              <li className="nav-item">
                <NavLink className="nav-link" to="/bug/list">
                  Bug List
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" onClick={(evt) => onLogout(evt)}>
                  Logout
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
