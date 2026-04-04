import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e, role) => {
    e.preventDefault();
    if (email && password) {
      try {
        const data = await login(email, password);
        if (data.user.role === role) {
          navigate(role === 'worker' ? '/dashboard/worker' : '/dashboard/admin');
        } else {
          alert(`Invalid ${role} credentials.`);
        }
      } catch (err) {
        alert('Invalid email or password.');
      }
    } else {
      alert('Please fill in both email and password.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 className="logo" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>PulseSure</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Parametric Insurance for Gig Workers</p>
        </div>
        
        <form>
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
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={(e) => handleLogin(e, 'worker')}
            >
              👷 Login as Worker
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={(e) => handleLogin(e, 'admin')}
            >
              🛠️ Login as Admin
            </button>
          </div>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Don't have an account? <span onClick={() => navigate('/register')} style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
