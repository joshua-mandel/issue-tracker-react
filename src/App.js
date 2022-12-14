import './App.scss';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import BugEditor from './components/BugEditor';
import BugList from './components/BugList';
import LoginForm from './components/LoginForm.js';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import 'react-toastify/dist/ReactToastify.css';
import UserEditor from './components/UserEditor';
import UserList from './components/UserList';
import { useState, useEffect } from 'react';
import NewBug from './components/NewBug';

function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage) {
      const storedAuthToken = localStorage.getItem('authToken');
      if (storedAuthToken) {
        const authPayload = jwt.decode(storedAuthToken);
        if (authPayload) {
          const auth = {
            token: storedAuthToken,
            payload: authPayload,
            emailAddress: authPayload.emailAddress,
            userId: authPayload._id,
          };
          setAuth(auth);
          console.log(auth);
        }
      }
    }
  }, []);

  function onLogin(auth) {
    setAuth(auth);
    showSuccess('Logged In.');
    navigate('/bug/list');
    if (localStorage) {
      localStorage.setItem('authToken', auth.token);
    }
  }

  function onLogout() {
    setAuth(null);
    showSuccess('Logged Out.');
    navigate('/login');
    if (localStorage) {
      localStorage.removeItem('authToken');
    }
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
        <ToastContainer theme="dark" />
        <main className="container my-5">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm onLogin={onLogin} showError={showError} />} />
            <Route path="/register" element={<RegisterForm onLogin={onLogin} showError={showError} showSuccess={showSuccess} />} />
            <Route path="/bug/list" element={<BugList auth={auth} />} />
            <Route path="/bug/:bugId" element={<BugEditor auth={auth} showError={showError} showSuccess={showSuccess} />} />
            <Route path="/bug/report" element={<NewBug auth={auth} showError={showError} showSuccess={showSuccess} />} />
            <Route path="/user/list" element={<UserList auth={auth} />} />
            <Route path="user/:userId" element={<UserEditor auth={auth} showError={showError} showSuccess={showSuccess} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
