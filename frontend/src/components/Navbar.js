import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h2>📊 Lead Management Dashboard</h2>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, <strong>{user.username}</strong></span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
