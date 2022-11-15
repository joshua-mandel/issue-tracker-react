import { Route, Routes, Link } from 'react-router-dom';
import { BugEditor } from './components/BugEditor';
import BugList from './components/BugList';
import { BugListItem } from './components/BugListItem';
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm';
import { UserEditor } from './components/UserEditor';
import { UserList } from './components/UserList';
import { UserListItem } from './components/UserListItem';
import { useState } from 'react';
import './styles/App.css';
import { nanoid } from 'nanoid';

function App() {
  const [users, setUsers] = useState([
    { id: nanoid(), name: 'Admin', email: 'admin@example.com', password: 'password', admin: true },
    { id: nanoid(), name: 'Joshua', email: 'joshua@example.com', password: 'password', admin: false },
    { id: nanoid(), name: 'Zachary', email: 'zachary@example.com', password: 'password', admin: false },
  ]);

  const [bugs, setBugs] = useState([
    {title: 'Add a Navbar', description: 'Add a robust and functioning navbar that matches the theme of the website.', bugClass: 'feature'},
    {title: 'Fix Contact Page Bug', description: 'Upon submitting a message on the contact page, there is an error that occurs and will not submit the message to the system.', bugClass: 'bug' },
    {title: 'Add a Footer', description: 'A footer needs to be added that includes our companies address, phone number, and hours. There also needs to be links for our social media pages.', bugClass: 'feature'},
  ]);

  return (
    <>
      <div className="" id="background">
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
                  <Link className='nav-link' to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/bug-editor">Bug Editor</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/bug-list">Bug List</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/bug-list-item">Bug List Item</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/user-editor">User Editor</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/user-list">User List</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/user-list-item">User List Item</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginForm isLoggedIn={(evt => console.log('logged in!'))} />} />
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
