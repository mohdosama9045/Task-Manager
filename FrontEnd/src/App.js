import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import AuthForm from './components/AuthForm';
import { getCurrentUser, loginUser, registerUser, logoutUser } from './services/localStorage';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authType, setAuthType] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleAuth = async (email, password, name = null) => {
    setLoading(true);
    setError('');

    try {
      let user;
      if (authType === 'login') {
        user = await loginUser(email, password);
      } else {
        user = await registerUser(name, email, password);
      }
      setCurrentUser(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setAuthType('login');
  };

  const switchAuthType = (type) => {
    setAuthType(type);
    setError('');
  };

  if (currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <AuthForm
      type={authType}
      onSubmit={handleAuth}
      loading={loading}
      error={error}
      onSwitchType={switchAuthType}
    />
  );
}

export default App;