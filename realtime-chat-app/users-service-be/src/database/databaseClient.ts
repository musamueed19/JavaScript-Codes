import type { DatabaseConfig } from "../config/types.js";
import mongoose from "mongoose";

export const connectDatabase = async (databaseConfig: DatabaseConfig) => {
  try {
    const connection = await mongoose.connect(databaseConfig.dbURI, {
      dbName: "users-service",
    });
    console.log(
      "Connected to the database successfully"
      // JSON.stringify(connection.ConnectionStates, null, 2)
    );
    return connection;
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process with an error code
  }
};
