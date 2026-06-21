// create socketIO instance in the frontend client.
// This will send connection IO request to the backend server and establish a connection between the client and the server.

const socket = io();

socket.on("connect", () => {
  console.log("Connected to the backend server with socket ID:", socket.id);
});

// Take username on page load and send it to the backend server, so that we can identify the user on the map with their username instead of socket ID. This is optional, but it will enhance the user experience.
const username = prompt("Please enter your name:");
socket.emit("set-username", { username });

// check if frontend client allows us to access the location of the user, if yes, then we will send the location data to the backend server, else we will log an error message in the console.
const userLocation = navigator.geolocation;
if (userLocation) {
  userLocation.watchPosition(
    (position) => {
      console.log("Position data sent to backend:", position);
      const { latitude, longitude } = position.coords;

      // Send location data to the backend server
      socket.emit("user-location", { latitude, longitude });
    },
    (error) => console.log(error),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5_000,
    }
  );
}

/**
 * Step 1: Initialize Map & it's geographical localtion and Zoom Level
 */

// variable Initialization
const markers = {};
const map = L.map("map").setView([0, 0], 13);

/**
 * Step 2: Add an OpenStreetMap Tile Layer to the Map
 */
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; Muhammad Musa Mueed 2026",
}).addTo(map);

/**
 * Step 3: Listen for Location Data from the Backend Server and Update the Map with Markers
 * Here, we are listening for the "received-user-location" event from the backend server, which will send us the location data of the user. We will then update the map with a marker for that user's location. If the marker for that user already exists, we will update its position instead of creating a new marker.
 */
socket.on("received-user-location", (data) => {
  console.log("Received location data from backend server:", data);
  const { id, latitude, longitude, username } = data;
  if (id && latitude && longitude && username) {
    // Check if the marker for this user already exists
    if (markers[id]) {
      // Update the existing marker's position
      markers[id].setLatLng([latitude, longitude]);
    } else {
      const marker = L.marker([latitude, longitude]).addTo(map);
      marker.bindPopup(`User Name: ${username}`); //.openPopup();
      markers[id] = marker;
    }
    // 2. Pro Tip: If the user is the one who sent the location data, we can center the map on their location for better user experience.
    if (id === socket.id) {
      map.setView([latitude, longitude], 17); // zoom level: 17 is a good level for street-level detail
    }
  }
});

// remove marker of the "user-disconnected" from Layer
socket.on("user-disconnected", (data) => {
  console.log("User disconnected:", data);
  if (markers[data.id]) {
    map.removeLayer(markers[data.id]);
    delete markers[data.id];
  }
});
