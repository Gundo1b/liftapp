document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const resultsList = document.getElementById("search-results");
  let map;
  let userMarker;
  let stops = []; // multiple stops
  let routeLine = null;

  const blueIcon = new L.Icon({
    iconUrl: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
  });

  const redIcon = new L.Icon({
    iconUrl: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
  });

  function initMap(lat, lon) {
    map = L.map("map").setView([lat, lon], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

      attribution: "© OpenStreetMap contributors"

  

    }).addTo(map);

    userMarker = L.marker([lat, lon], { icon: blueIcon })
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();

    stops.push(L.latLng(lat, lon)); // add start point
  }

  // Get user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      initMap(latitude, longitude);
    }, () => {
      initMap(-26.2, 28.05); // fallback
    });
  } else {
    initMap(-26.2, 28.05); // fallback
  }

  input.addEventListener("input", async () => {
    const query = input.value.trim();
    resultsList.innerHTML = "";

    if (query.length < 2) return;

    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const data = await res.json();

    data.slice(0, 5).forEach((place) => {
      const li = document.createElement("li");
      li.textContent = place.display_name;

      li.addEventListener("click", () => {
        input.value = "";
        resultsList.innerHTML = "";

        const lat = parseFloat(place.lat);
        const lon = parseFloat(place.lon);
        const stopLatLng = L.latLng(lat, lon);

        // Add marker for stop
        L.marker(stopLatLng, { icon: redIcon }).addTo(map).bindPopup(place.display_name);

        stops.push(stopLatLng); // add to list of stops

        // Fit map to all stops
        const bounds = L.latLngBounds(stops);
        map.fitBounds(bounds, { padding: [50, 50] });

        // Remove old route
        if (routeLine) map.removeLayer(routeLine);

        // Draw new route with all stops
        L.Routing.osrmv1().route(
          stops.map(point => L.Routing.waypoint(point)),
          function (err, routes) {
            if (!err && routes.length > 0) {
              routeLine = L.Routing.line(routes[0], {
                styles: [{ color: "#007bff", weight: 5 }]
              }).addTo(map);
            }
          }
        );
      });

      resultsList.appendChild(li);
    });
  });
});

window.logoutUser = async function() {
  await supabase.auth.signOut();
  window.location.href = "/pages/aouth/login.html";
}

window.toggleUserMenu = function() {
  const dropdown = document.getElementById("user-dropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Close dropdown if clicked outside
document.addEventListener("click", (event) => {
  const menu = document.querySelector(".user-menu");
  if (!menu.contains(event.target)) {
    document.getElementById("user-dropdown").style.display = "none";
  }
});