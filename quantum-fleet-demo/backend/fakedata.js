// Mock data for nearby locations
exports.fakeLocations = [
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
];

// Mock data for optimized route
exports.fakeRoute = {
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
  geometry: [
    [77.5946, 12.9716],
    [77.595, 12.972],
    [77.5955, 12.9725],
    [77.596, 12.973],
  ],
};

// Mock data for EV stats
exports.evStats = {
  deliveriesToday: 42,
  co2Saved: '87.3 kg',
  totalDistance: '378.5 km',
};

// Mock data for accessible routes
exports.accessibleRoutes = [
  {
    id: 1,
    distance: '2.1 km',
    time: '8 mins',
    difficulty: 'Easy',
    obstacles: 'None',
  },
  {
    id: 2,
    distance: '1.8 km',
    time: '7 mins',
    difficulty: 'Easy',
    obstacles: 'None',
  },
];
