import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('worker'); // Default role
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      try {
        await register(name, email, password, role);
        alert(`Registration successful as ${role === 'worker' ? 'Worker' : 'Admin'}! Redirecting to login...`);
        navigate('/');
      } catch (err) {
        alert(err.message || 'Registration failed.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 className="logo" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>PulseSure</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Join the future of gig protection</p>
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="role">Register As</label>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button
                type="button"
                className={`btn ${role === 'worker' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '0.5rem' }}
                onClick={() => setRole('worker')}
              >
                👷 Worker
              </button>
              <button
                type="button"
                className={`btn ${role === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '0.5rem' }}
                onClick={() => setRole('admin')}
              >
                🛠️ Admin
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Work Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create {role === 'worker' ? 'Worker' : 'Admin'} Account
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already have an account? <span onClick={() => navigate('/')} style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
