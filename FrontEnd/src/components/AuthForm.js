import React, { useState } from 'react';

const AuthForm = ({ type, onSubmit, loading, error, onSwitchType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (type === 'register') {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }
      onSubmit(formData.name, formData.email, formData.password);
    } else {
      onSubmit(formData.email, formData.password);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Task Manager</h2>
          <p>{type === 'login' ? 'Sign in to your account' : 'Create your account'}</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {type === 'register' && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          {type === 'register' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                disabled={loading}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" style={{width: '16px', height: '16px', borderWidth: '2px'}}></div>
                {type === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              type === 'login' ? 'Sign In' : 'Sign Up'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {type === 'login' 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <span 
              className="auth-link" 
              onClick={() => onSwitchType(type === 'login' ? 'register' : 'login')}
            >
              {type === 'login' ? 'Sign up' : 'Sign in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;