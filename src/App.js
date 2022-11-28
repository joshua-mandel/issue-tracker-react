import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import BugEditor from './components/BugEditor';
import BugList from './components/BugList';
import BugListItem from './components/BugListItem';
import LoginForm from './components/LoginForm.js';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserEditor } from './components/UserEditor';
import { UserList } from './components/UserList';
import { UserListItem } from './components/UserListItem';
import { useState } from 'react';
import './styles/App.css';
import { nanoid } from 'nanoid';

function App() {

  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  function onLogin(auth) {
    setAuth(auth);
    showSuccess('Logged In.');
    navigate('user/list');
  }

  function onLogout() {
    setAuth(null);
    showSuccess('Logged Out.');
    navigate('login');
  }

  function showSuccess(message) {
    toast(message, { type: 'success', position: 'bottom-right' });
  }

  function showError(message) {
    toast(message, { type: 'error', position: 'bottom-right' });
  }

  return (
    <div className="App min-vh-100 d-flex flex-column">
    <Navbar auth={auth} onLogout={onLogout} />
    <div className="flex-grow-1">
      <ToastContainer />
      <main className="container my-5">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm onLogin={onLogin} showError={showError} />} />
          <Route path="/bug/list" element={<BugList auth={auth} />} />
          <Route path="/bug/:bugId" element={<BugEditor auth={auth} showError={showError} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
    <Footer />
  </div>
  );
}

export default App;
