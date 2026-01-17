import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fill demo credentials on mount
    if (!isRegister) {
      setFormData({ username: 'demo', email: '', password: 'demo123' });
    }
  }, [isRegister]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (isRegister) {
        response = await authAPI.register(formData.username, formData.email, formData.password);
      } else {
        response = await authAPI.login(formData.username, formData.password);
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLogin(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>{isRegister ? 'Register' : 'Login'}</h1>
        
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <div className="toggle-link" onClick={() => {
          setIsRegister(!isRegister);
          setError('');
          setFormData({ username: '', email: '', password: '' });
        }}>
          {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
        </div>

        {!isRegister && (
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#7f8c8d', textAlign: 'center' }}>
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: demo</p>
            <p>Password: demo123</p>
          </div>
        )}
      </div>
    </div>
  );
}
