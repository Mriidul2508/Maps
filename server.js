const express = require('express');
const app = express();
const port = 3000;

// Dummy data for vehicle location
let vehicleLocationData = [
  { latitude: 17.385044, longitude: 78.486671, timestamp: '2024-07-20T10:00:00Z' },
  { latitude: 17.385045, longitude: 78.486672, timestamp: '2024-07-20T10:00:05Z' },
  // Add more data points here...
];

// API endpoint to get the vehicle location data
app.get('/api/vehicle-location', (req, res) => {
  res.json(vehicleLocationData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});