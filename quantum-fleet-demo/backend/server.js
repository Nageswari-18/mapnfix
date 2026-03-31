const express = require('express');
const cors = require('cors');
const {
  fakeLocations,
  fakeRoute,
  evStats,
  accessibleRoutes,
} = require('./data/fakeData');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// 1. Get nearby locations
app.get('/api/nearby-locations', (req, res) => {
  console.log('📌 Sending fake locations...');
  setTimeout(() => res.json(fakeLocations), 1000);
});

// 2. Optimize route
app.post('/api/optimize-route', (req, res) => {
  console.log('🗺️ Sending fake optimized route...');
  setTimeout(() => res.json(fakeRoute), 2000);
});

// 3. Get EV stats
app.get('/api/ev-stats', (req, res) => {
  console.log('🔋 Sending EV stats...');
  res.json(evStats);
});

// 4. Request mechanical support
app.post('/api/request-support', (req, res) => {
  console.log('🔧 Processing support request...');
  setTimeout(
    () =>
      res.json({
        message: 'Mechanic notified! ETA 15-20 mins',
        requestId: Math.floor(Math.random() * 10000),
      }),
    1500
  );
});

// 5. Emergency assistance
app.post('/api/emergency-assist', (req, res) => {
  console.log('🆘 Processing emergency request...');
  setTimeout(
    () =>
      res.json({
        message: 'Help is coming! Rider alerted',
        eta: '5-7 minutes',
      }),
    1000
  );
});

// 6. Get accessible routes
app.get('/api/accessible-routes', (req, res) => {
  console.log('♿ Sending accessible routes...');
  res.json(accessibleRoutes);
});
// Serve frontend files (add this before app.listen)
app.use(express.static('../frontend'));

// Root route - serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`✅ Fake backend server running at http://localhost:${port}`);
});
