import { NavLink } from 'react-router-dom';

function Navbar({ auth, onLogout }) {
  return (
    <header className="navbar navbar-expand navbar-dark bg-dark">
      <nav className="container-fluid">
        {auth && <span className="navbar-text">{auth.email}</span>}
        <ul className="navbar-nav">
          {!auth && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          )}
          {auth && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" onClick={(evt) => onLogout(evt)}>
                Logout
              </NavLink>
              <li className="nav-item">
                <NavLink className="nav-link" to="/bug/list">
                  Bug List
                </NavLink>
              </li>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
