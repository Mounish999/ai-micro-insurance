const API_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('currentUser', JSON.stringify(data.user));
  return data;
};

export const register = async (name, email, password, role) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
  return response.json();
};

export const getStats = async () => {
  const response = await fetch(`${API_URL}/stats`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};

export const buyPolicy = async (plan) => {
  const response = await fetch(`${API_URL}/buy-policy`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ plan })
  });
  if (!response.ok) throw new Error('Failed to buy policy');
  return response.json();
};

export const getUserPolicy = async () => {
  const response = await fetch(`${API_URL}/user/policy`, {
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch user policy');
  return response.json();
};

export const getConditions = async () => {
  const response = await fetch(`${API_URL}/conditions`);
  if (!response.ok) throw new Error('Failed to fetch conditions');
  return response.json();
};

export const simulateConditions = async (conditions) => {
  const response = await fetch(`${API_URL}/conditions/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(conditions)
  });
  if (!response.ok) throw new Error('Failed to simulate conditions');
  return response.json();
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
};