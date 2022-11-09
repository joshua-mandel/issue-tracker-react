import { Route, Routes, Link } from 'react-router-dom';
import { BugEditor } from './components/BugEditor';
import { BugList } from './components/BugList';
import { BugListItem } from './components/BugListItem';
import { LoginForm } from './components/LoginForm.js';
import { RegisterForm } from './components/RegisterForm';
import { UserEditor } from './components/UserEditor';
import { UserList } from './components/UserList';
import { UserListItem } from './components/UserListItem';

function App() {
  return (
    <>
    <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/bug-editor" element={<BugEditor />} />
      <Route path="/bug-list" element={<BugList />} />
      <Route path="/bug-list-item" element={<BugListItem />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/user-editor" element={<UserEditor />} />
      <Route path="/user-list" element={<UserList />} />
      <Route path="/user-list-item" element={<UserListItem />} />
    </Routes>
    </>
  );
}

export default App;
