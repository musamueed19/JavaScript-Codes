import express from "express";

import dotenv from "dotenv";
import { getDatabaseConfig } from "./config/databaseConfig.js";
import { connectDatabase } from "./database/databaseClient.js";
import {
  getRedisClient,
  type RedisClient,
} from "./shared/redisClient.service.js";
import { getBrokerChannel, type BrokerChannel } from "./broker/rabbitmqClient.service.js";
dotenv
  .config
  // { override: true, quiet: false }
  ();



  // Routes Import
  import userRoutes from "./users/users.controller.js"

// environment variables defined here --------------
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";
const dbConfig = getDatabaseConfig();

// express server instance setup
const app = express();

// setup all middlewares here -------
app.use(express.json());

// health test endpoint
app.get("/health", (req, res) => {
  res.status(200).send({
    status: "up",
    message: "Users service is running",
  });
});

// variables defination
// let dbConnection: ReturnType<typeof connectDatabase> | null = null;
let redisClient: RedisClient | null = null;


// routes defination
app.use("api/v1", userRoutes)

// Bootstrap the Users Service
const bootstrap = async () => {
  // DB and Redis Setup
  await connectDatabase(dbConfig);
  redisClient = await getRedisClient();
  console.log("Redis Ready: ", redisClient.isReady);


  // Broker Setup (done)

  // server listening setup
  app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}/health`);
  });
};

bootstrap().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});

process.on("SIGINT", async () => {
  console.log("Shutting down server...");

  if (redisClient) {
    await redisClient.quit();
    console.log("Redis client disconnected");
  }

  process.exit(0);
});