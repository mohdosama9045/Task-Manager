import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const handleLogin = (email, password) => {
    onLogin(email, password);
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      onSwitchType={() => onSwitchToRegister()}
    />
  );
};

export default Login;