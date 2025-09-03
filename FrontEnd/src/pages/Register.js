import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const handleRegister = (name, email, password) => {
    onRegister(name, email, password);
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
      onSwitchType={() => onSwitchToLogin()}
    />
  );
};

export default Register;