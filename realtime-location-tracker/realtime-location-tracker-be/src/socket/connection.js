export const connect = (io) => {
  const usernames = {};
  try {
    io.on("connection", (socket) => {
      console.log(`===== SOCKET CONNECTED: ${socket.id} =====`);

      // 1. Listen for location updates from this specific client
      socket.on("user-location", (data) => {
        console.log(`Received location data from client ${socket.id}:`, data);

        // Broadcast the location data to ALL other connected clients
        io.emit("received-user-location", {
          id: socket.id,
          latitude: data.latitude,
          longitude: data.longitude,
          username: usernames[socket.id] || "Anonymous",
        });
      });

      // 2. Listen for when this specific client disconnects
      socket.on("disconnect", () => {
        console.log(`----- SOCKET DISCONNECTED: ${socket.id} -----`);

        // Notify others that this user left
        io.emit("user-disconnected", { id: socket.id });
      });

      // 3. Save username on "set-username" event
      socket.on("set-username", (data) => {
        usernames[socket.id] = data.username;
      });
    });
  } catch (error) {
    console.log(error);
  }
};
