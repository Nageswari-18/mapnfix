const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Fake data - No path needed!
const fakeData = {
  locations: [
    {
      id: 1,
      name: 'City Mall',
      lat: 12.9716,
      lon: 77.5946,
      type: 'Shopping Center',
      distance: '0.8 km',
    },
    {
      id: 2,
      name: 'Central Hospital',
      lat: 12.973,
      lon: 77.597,
      type: 'Healthcare',
      distance: '1.2 km',
    },
    {
      id: 3,
      name: 'Tech Park',
      lat: 12.97,
      lon: 77.592,
      type: 'Business',
      distance: '1.5 km',
    },
  ],
  routes: [
    {
      from: 'Your Location',
      to: 'City Mall',
      totalDistance: '4.2 km',
      totalTime: '15 mins',
      cost: '$8.50',
      co2Saved: '1.2 kg',
      instructions: [
        'Head north on Main Street for 0.8 km',
        'Turn right onto Oak Avenue',
        'Continue straight for 1.2 km',
        'Take the 2nd exit at the roundabout',
        'Destination will be on your left',
      ],
    },
  ],
  evStats: {
    deliveriesToday: 42,
    co2Saved: '87.3 kg',
    totalDistance: '378.5 km',
  },
};
let accessibilityMap, mechanicMap;

function openAccessibilityDashboard() {
  openModal('accessibilityModal');
  if (!accessibilityMap) {
    setTimeout(() => {
      accessibilityMap = L.map('accessibilityMap').setView(
        [12.9716, 77.5946],
        12
      );
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
      }).addTo(accessibilityMap);

      const locations = [
        [12.975, 77.605, 'Cafe Coffee Day'],
        [12.991, 77.554, 'Orion Mall'],
        [12.95, 77.584, 'Lalbagh Garden'],
        [12.978, 77.64, 'Indiranagar Metro'],
      ];
      locations.forEach((loc) =>
        L.marker([loc[0], loc[1]]).addTo(accessibilityMap).bindPopup(loc[2])
      );
      setTimeout(() => accessibilityMap.invalidateSize(), 200);
    }, 200);
  } else {
    setTimeout(() => accessibilityMap.invalidateSize(), 200);
  }
}

function openMechanicalSupport() {
  openModal('mechanicModal');
  if (!mechanicMap) {
    setTimeout(() => {
      mechanicMap = L.map('mechanicMap').setView([12.9716, 77.5946], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
      }).addTo(mechanicMap);

      L.marker([12.9716, 77.5946]).addTo(mechanicMap).bindPopup('You are here');
      L.marker([12.965, 77.6])
        .addTo(mechanicMap)
        .bindPopup('Nearest Mechanic Support Center');
      setTimeout(() => mechanicMap.invalidateSize(), 200);
    }, 200);
  } else {
    setTimeout(() => mechanicMap.invalidateSize(), 200);
  }
}

function showFeatures() {
  const f = document.getElementById('features');

  // show features
  f.style.display = 'grid';

  // scroll to section
  f.scrollIntoView({ behavior: 'smooth' });
}
function sendMechanicSupport() {
  const location = document.getElementById('mechanicLocation').value;
  const msg = document.getElementById('mechanicMsg');
  if (location.trim() === '') {
    msg.innerText = '⚠️ Please enter a location.';
  } else {
    msg.innerText = `✅ Request sent! Mechanic will arrive shortly at ${location}.`;
  }
}

function openEVScooters() {
  openModal('evModal');
}
let generatedOTP = '';

function sendOTP() {
  const mobile = document.getElementById('mobile').value;

  if (mobile.length !== 10) {
    alert('Enter valid mobile number');
    return;
  }

  // fake OTP generate
  generatedOTP = Math.floor(1000 + Math.random() * 9000);
  alert('OTP sent: ' + generatedOTP); // demo purpose
}

function verifyOTP(event) {
  event.preventDefault();

  const enteredOTP = document.getElementById('otp').value;

  if (enteredOTP == generatedOTP) {
    alert('Signup Successful ✅');
  } else {
    alert('Invalid OTP ❌');
  }
}

// =====================
// API ROUTES (SIMPLIFIED)
// =====================

// Test route - proves server is working
app.get('/', (req, res) => {
  res.json({
    message: '✅ Quantum Fleet Backend is running!',
    instructions: 'Visit /api/nearby-locations to test the API',
    status: 'active',
  });
});

// 1. Get nearby locations
app.get('/api/nearby-locations', (req, res) => {
  console.log('📌 Sending fake locations...');
  setTimeout(() => {
    res.json({
      success: true,
      data: fakeData.locations,
      message: 'Nearby delivery locations found',
    });
  }, 1000);
});

// 2. Optimize route
app.post('/api/optimize-route', (req, res) => {
  console.log('🗺️ Sending fake optimized route...');
  setTimeout(() => {
    res.json({
      success: true,
      data: fakeData.routes[0],
      quantumScore: '92% efficiency',
    });
  }, 2000);
});

// 3. Get EV stats
app.get('/api/ev-stats', (req, res) => {
  console.log('🔋 Sending EV stats...');
  res.json({
    success: true,
    data: fakeData.evStats,
    environmentalImpact: 'Equivalent to planting 12 trees',
  });
});

// 4. Mechanical support
app.post('/api/request-support', (req, res) => {
  console.log('🔧 Processing support request...');
  const { issue, location } = req.body;

  setTimeout(() => {
    res.json({
      success: true,
      message: `Mechanic notified for: ${issue || 'unknown issue'} at ${
        location || 'your location'
      }`,
      requestId: Math.floor(Math.random() * 10000),
      estimatedTime: '15-20 minutes',
      status: 'help_coming',
    });
  }, 1500);
});

// 5. Emergency assistance
app.post('/api/emergency-assist', (req, res) => {
  console.log('🆘 Processing emergency request...');
  const { location } = req.body;

  setTimeout(() => {
    res.json({
      success: true,
      message: 'Emergency alert sent! Help is on the way',
      responder: {
        name: 'Rider #' + Math.floor(Math.random() * 1000),
        eta: '5-7 minutes',
        distance: '0.8 km away',
      },
      status: 'emergency_responded',
    });
  }, 1000);
});

// =====================
// START SERVER
// =====================
app.listen(port, () => {
  console.log(`\n✅ FAKE BACKEND SERVER RUNNING!`);
  console.log(`📍 Server URL: http://localhost:${port}`);
  console.log(`📍 Test API: http://localhost:${port}/api/nearby-locations`);
  console.log(`📍 Home: http://localhost:${port}`);
  console.log(`\n🚀 TROUBLESHOOTING:`);
  console.log(`• If port ${port} is busy, change the port number`);
  console.log(`• Make sure you're in the backend folder: cd backend`);
  console.log(`• Press Ctrl+C to stop the server\n`);
});
