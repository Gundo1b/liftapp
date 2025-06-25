// js/dashboard.js

// Initialize map
const map = L.map('map').setView([-26.2041, 28.0473], 13); // Johannesburg as example

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Optional: add a marker
L.marker([-26.2041, 28.0473]).addTo(map)
  .bindPopup('You are here.')
  .openPopup();
