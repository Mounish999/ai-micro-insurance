import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStats, logout } from '../api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // User Info - Read from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Redirect if no user is found in storage OR if the user is not an admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Platform Stats
  const [stats, setStats] = useState([
    { label: 'Total Workers', value: '---', icon: '👷', color: 'badge-success' },
    { label: 'Policies Active', value: '---', icon: '📄', color: 'badge-success' },
    { label: 'Total Premiums', value: '---', icon: '💸', color: 'badge-warning' },
    { label: 'System Health', value: '99.9%', icon: '🟢', color: 'badge-success' }
  ]);

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = () => {
    getStats().then(data => {
      if (!data || !data.stats) return;

      setStats(prev => prev.map(stat => {
        if (stat.label === 'Total Workers') return { ...stat, value: data.stats.totalWorkers ?? 0 };
        if (stat.label === 'Policies Active') return { ...stat, value: data.stats.totalPolicies ?? 0 };
        if (stat.label === 'Total Premiums') {
          const premiums = data.stats.totalPremiums ?? 0;
          return { ...stat, value: `₹ ${Number(premiums).toLocaleString()}` };
        }
        return stat;
      }));
      // Show all registered users
      setRegisteredUsers(data.users || []);
      setLastUpdated(new Date().toLocaleTimeString());
    }).catch(err => {
      console.error('Failed to fetch admin stats:', err);
    });
  };

  useEffect(() => {
    if (loading) return;
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [loading]);

  if (loading || !user) {
    return <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Admin Portal...</div>;
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">PulseSure <span style={{ fontSize: '0.8rem', opacity: 0.7, color: 'var(--text-muted)' }}>ADMIN PORTAL</span></div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{user.name} ({user.role})</span>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="dashboard-container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Registered Accounts</h2>
            <p style={{ color: 'var(--text-muted)' }}>Viewing all persons registered through the platform.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button className="btn btn-secondary" style={{ width: 'auto', marginBottom: '0.5rem' }} onClick={fetchData}>
              🔄 Refresh Data
            </button>
            {lastUpdated && (
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Last synced: {lastUpdated}
              </p>
            )}
          </div>
        </header>

        {/* Top Stats - Relevant to Workers */}
        <section className="grid" style={{ marginBottom: '3rem' }}>
          {stats.filter(s => s.label === 'Total Workers' || s.label === 'Policies Active' || s.label === 'Total Premiums').map((stat, index) => (
            <div key={index} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{stat.label}</p>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stat.value}</h3>
                </div>
                <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Registered Users Table */}
        <section className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: 0 }}>Active Accounts</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Daily Earnings</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {registeredUsers.map((u, idx) => (
                <tr key={u.id || idx}>
                  <td style={{ fontWeight: '600' }}>{u.name || 'N/A'}</td>
                  <td>{u.email || 'N/A'}</td>
                  <td>
                    <span className={`badge ${u.role === 'admin' ? 'badge-warning' : 'badge-success'}`}>
                      {u.role || 'worker'}
                    </span>
                  </td>
                  <td>{u.role === 'worker' ? `₹ ${u.dailyEarnings ?? 700}` : '---'}</td>
                  <td>
                    <span style={{ color: 'var(--success)', fontSize: '0.8rem', fontWeight: '700' }}>● Active</span>
                  </td>
                </tr>
              ))}
              {registeredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No accounts registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
