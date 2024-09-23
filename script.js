// Initialize the map
let map = L.map('map').setView([17.385044, 78.486671], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo(map);

// Initialize the vehicle icon
let vehicleIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28]
});

// Function to update the vehicle location
function updateVehicleLocation(data) {
  // Clear the previous route
  map.removeLayer(route);

  // Create a new route
  let route = L.polyline(data.map(point => [point.latitude, point.longitude]), {
    color: 'blue',
    weight: 5,
    opacity: 0.5
  }).addTo(map);

  // Update the vehicle icon
  let vehicleMarker = L.marker([data[data.length - 1].latitude, data[data.length - 1].longitude], {
    icon: vehicleIcon
  }).addTo(map);

  // Set the map view to the vehicle location
  map.setView([data[data.length - 1].latitude, data[data.length - 1].longitude], 13);
}

// Make API call to get the vehicle location data
fetch('/api/vehicle-location')
  .then(response => response.json())
  .then(data => updateVehicleLocation(data));

// Update the vehicle location every 5 seconds
setInterval(() => {
  fetch('/api/vehicle-location')
    .then(response => response.json())
    .then(data => updateVehicleLocation(data));
}, 5000);