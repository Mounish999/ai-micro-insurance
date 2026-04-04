import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserPolicy, buyPolicy, logout, getConditions, simulateConditions } from '../api';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  
  // User Info - Read from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Redirect if no user is found in storage
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [activePolicy, setActivePolicy] = useState(null);
  const [conditions, setConditions] = useState({
    weather: 'Clear',
    temp: '28°C',
    aqi: 'Low',
    demand: 'High',
    rainfall: 0,
    ordersToday: 25
  });

  useEffect(() => {
    if (user) {
      getUserPolicy().then(setActivePolicy).catch(console.error);
      getConditions().then(setConditions).catch(console.error);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Insurance Plans
  const plans = [
    { id: 1, name: 'Basic Plan', price: 10, coverage: 300, icon: '🛡️' },
    { id: 2, name: 'Pro Plan', price: 20, coverage: 500, icon: '🚀' },
    { id: 3, name: 'Premium Plan', price: 30, coverage: 700, icon: '💎' }
  ];

  // Dynamic States
  const [riskLevel, setRiskLevel] = useState('Low');
  const [status, setStatus] = useState('Protected');
  const [payoutTriggered, setPayoutTriggered] = useState(false);
  const [dropDetected, setDropDetected] = useState(false);

  // Payment States
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Dynamic Prices based on Risk
  const getDynamicPrice = (basePrice) => {
    if (riskLevel === 'High') return Math.round(basePrice * 1.5);
    if (riskLevel === 'Medium') return Math.round(basePrice * 1.2);
    return basePrice;
  };

  // Simulation Logic
  useEffect(() => {
    let risk = 'Low';
    
    // Condition 1: Payout Trigger (Rain/AQI/Demand)
    if (conditions.weather === 'Rain' || conditions.rainfall > 10 || conditions.aqi === 'High' || conditions.demand === 'Low') {
      risk = conditions.weather === 'Rain' ? 'High' : 'Medium';
      setPayoutTriggered(true);
      setStatus('Claim Processing');
    } else {
      setPayoutTriggered(false);
      setStatus('Protected');
    }

    // Condition 2: Drop Detection
    if (conditions.ordersToday < 10) {
      setDropDetected(true);
    } else {
      setDropDetected(false);
    }

    setRiskLevel(risk);
  }, [conditions]);

  const handleBuyPlan = (plan) => {
    setSelectedPlan({ ...plan, price: getDynamicPrice(plan.price) });
    setIsPaying(true);
    setPaymentComplete(false);
  };

  const processPayment = async () => {
    try {
      const data = await buyPolicy(selectedPlan);
      setActivePolicy(data.policy);
      setPaymentComplete(true);
      setTimeout(() => setIsPaying(false), 2000);
    } catch (err) {
      alert('Payment failed.');
      setIsPaying(false);
    }
  };

  const handleSimulateDisruption = async () => {
    try {
      const newConditions = await simulateConditions({
        weather: 'Rain',
        temp: '22°C',
        aqi: 'High',
        demand: 'Low',
        rainfall: 15,
        ordersToday: 5
      });
      setConditions(newConditions);
    } catch (err) {
      alert('Simulation failed');
    }
  };

  const handleResetSim = async () => {
    try {
      const newConditions = await simulateConditions({
        weather: 'Clear',
        temp: '28°C',
        aqi: 'Low',
        demand: 'High',
        rainfall: 0,
        ordersToday: 25
      });
      setConditions(newConditions);
    } catch (err) {
      alert('Reset failed');
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">PulseSure</div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{user.name} ({user.role})</span>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="dashboard-container">
        {/* User Info & Quick Stats */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Hello, {user.name}!</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>Daily Earning Target: ₹{user.dailyEarnings}</p>
              {activePolicy && (
                <span className="badge badge-success" style={{ textTransform: 'none' }}>
                  ✓ Active Policy: {activePolicy.name}
                </span>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary" style={{ width: 'auto' }} onClick={handleResetSim}>Reset Simulation</button>
            <button className="btn btn-primary" style={{ width: 'auto' }} onClick={handleSimulateDisruption}>Simulate Disruption</button>
          </div>
        </header>

        {/* Insurance Plans */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: 0 }}>Available Protection Plans</h3>
            {riskLevel !== 'Low' && (
              <p style={{ fontSize: '0.875rem', color: 'var(--danger)', fontWeight: '600' }}>
                ⚠️ Risk-based pricing active (+{riskLevel === 'High' ? '50%' : '20%'})
              </p>
            )}
          </div>
          <div className="grid">
            {plans.map(plan => {
              const currentPrice = getDynamicPrice(plan.price);
              const isActive = activePolicy?.id === plan.id;
              
              return (
                <div key={plan.id} className={`card plan-card ${isActive ? 'active-plan' : ''}`} style={{ borderTopColor: isActive ? 'var(--success)' : 'var(--primary)' }}>
                  <div>
                    <span style={{ fontSize: '1.5rem' }}>{plan.icon}</span>
                    <h4 style={{ marginTop: '0.5rem' }}>{plan.name}</h4>
                    <div className="plan-price">
                      ₹{currentPrice}
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: '400' }}>/week</span>
                    </div>
                    <p className="plan-feature">✓ Covers up to ₹{plan.coverage}/day</p>
                    <p className="plan-feature">✓ Automatic Weather Payouts</p>
                  </div>
                  <button 
                    className={`btn ${isActive ? 'btn-secondary' : 'btn-primary'}`} 
                    style={{ marginTop: '1.5rem' }}
                    onClick={() => handleBuyPlan(plan)}
                    disabled={isActive}
                  >
                    {isActive ? 'Current Plan' : 'Select Plan'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Payment Modal */}
        {isPaying && (
          <div className="modal-overlay">
            <div className="modal-content">
              {!paymentComplete ? (
                <>
                  <h2 style={{ marginBottom: '1.5rem' }}>Confirm Payment</h2>
                  <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span>{selectedPlan.name} Premium</span>
                      <span style={{ fontWeight: '700' }}>₹{selectedPlan.price}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      <span>Risk Surcharge</span>
                      <span>₹{selectedPlan.price - plans.find(p => p.id === selectedPlan.id).price}</span>
                    </div>
                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.125rem' }}>
                      <span>Total to Pay</span>
                      <span style={{ color: 'var(--primary)' }}>₹{selectedPlan.price}</span>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Card Details</label>
                    <input type="text" className="form-input" placeholder="XXXX XXXX XXXX XXXX" defaultValue="4242 4242 4242 4242" />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-secondary" onClick={() => setIsPaying(false)}>Cancel</button>
                    <button className="btn btn-primary" onClick={processPayment}>
                      Pay Now
                    </button>
                  </div>
                </>
              ) : (
                <div className="payment-success">
                  <div className="icon">✅</div>
                  <h2 style={{ marginBottom: '0.5rem' }}>Payment Successful!</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Your {selectedPlan.name} is now active.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live Conditions & Risk */}
        <div className="grid" style={{ marginBottom: '3rem' }}>
          {/* Live Conditions */}
          <section className="card">
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>🌍 Live Conditions (Mock)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Weather</p>
                <p style={{ fontWeight: '700' }}>{conditions.weather} ({conditions.temp})</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AQI Level</p>
                <p style={{ fontWeight: '700' }}>{conditions.aqi}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Demand Level</p>
                <p style={{ fontWeight: '700' }}>{conditions.demand}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rainfall</p>
                <p style={{ fontWeight: '700' }}>{conditions.rainfall}mm</p>
              </div>
            </div>
          </section>

          {/* Risk Analysis */}
          <section className="card">
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>📊 Risk Analysis</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Risk</span>
                <span className={`badge ${riskLevel === 'Low' ? 'badge-success' : riskLevel === 'Medium' ? 'badge-warning' : 'badge-danger'}`}>
                  {riskLevel} Risk
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Weekly Premium</span>
                <span style={{ fontWeight: '700' }}>₹{plans[1].price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status</span>
                <span style={{ fontWeight: '700', color: status === 'Protected' ? 'var(--success)' : 'var(--warning)' }}>
                  {status}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Automatic Payout Alerts */}
        {(payoutTriggered || dropDetected) && (
          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>🔔 Notifications</h3>
            
            {payoutTriggered && (
              <div className="alert-payout" style={{ marginTop: '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>💸</span>
                  <div>
                    <h4 style={{ margin: 0 }}>Disruption Detected – Payout Triggered</h4>
                    <p style={{ margin: 0 }}>₹{user.dailyEarnings} credited to your account based on your Premium Plan.</p>
                  </div>
                </div>
              </div>
            )}

            {dropDetected && (
              <div className="alert-payout" style={{ background: '#fff7ed', border: '1px solid #ffedd5', color: '#9a3412', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>📉</span>
                  <div>
                    <h4 style={{ margin: 0 }}>Significant Drop Detected</h4>
                    <p style={{ margin: 0 }}>Expected Orders: 25 | Today Orders: {conditions.ordersToday}. Compensation triggered.</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default WorkerDashboard;
