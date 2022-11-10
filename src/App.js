import { Route, Routes, Link } from 'react-router-dom';
import { BugEditor } from './components/BugEditor';
import { BugList } from './components/BugList';
import { BugListItem } from './components/BugListItem';
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm';
import { UserEditor } from './components/UserEditor';
import { UserList } from './components/UserList';
import { UserListItem } from './components/UserListItem';
import './styles/App.css'

function App() {
  return (
    <>
      <div className='' id='background'>
      <nav className="navbar navbar-expand-lg bg-light sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Issue Tracker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link></Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={ <LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/bug-editor" element={<BugEditor />} />
        <Route path="/bug-list" element={<BugList />} />
        <Route path="/bug-list-item" element={<BugListItem />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user-editor" element={<UserEditor />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/user-list-item" element={<UserListItem />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
