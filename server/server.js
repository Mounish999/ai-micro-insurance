const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());

// Helper function to read/write DB
const readDB = () => {
  const data = fs.readFileSync(DB_PATH);
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const db = readDB();
  
  if (db.users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    role,
    dailyEarnings: role === 'worker' ? 700 : 0
  };

  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({ message: 'User registered' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  
  const user = db.users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  
  // Don't send password
  const { password: _, ...userData } = user;
  res.json({ token, user: userData });
});

// Stats Routes
app.get('/api/stats', (req, res) => {
  const db = readDB();
  
  // Return a subset of user info (exclude passwords)
  const userList = db.users.map(({ password, ...u }) => u);
  
  res.json({
    stats: {
      ...db.stats,
      totalWorkers: db.users.filter(u => u.role === 'worker').length
    },
    fraudAlerts: db.fraudAlerts,
    riskUsers: db.riskUsers,
    users: userList
  });
});

// Conditions Routes
app.get('/api/conditions', (req, res) => {
  const db = readDB();
  res.json(db.conditions);
});

app.post('/api/conditions/simulate', (req, res) => {
  const { weather, temp, aqi, demand, rainfall, ordersToday } = req.body;
  const db = readDB();
  db.conditions = { weather, temp, aqi, demand, rainfall, ordersToday };
  writeDB(db);
  res.json(db.conditions);
});

// Policy Routes
app.post('/api/buy-policy', authenticateToken, (req, res) => {
  const { plan } = req.body;
  const db = readDB();
  
  const newPolicy = {
    ...plan,
    userId: req.user.id,
    userEmail: req.user.email,
    purchaseDate: new Date().toISOString(),
    status: 'Active'
  };

  db.policies.push(newPolicy);
  
  // Update stats
  db.stats.totalPremiums += plan.price;
  db.stats.totalPolicies += 1;
  
  writeDB(db);
  res.status(201).json({ message: 'Policy purchased', policy: newPolicy });
});

app.get('/api/user/policy', authenticateToken, (req, res) => {
  const db = readDB();
  const policy = db.policies.find(p => p.userId === req.user.id);
  res.json(policy || null);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});