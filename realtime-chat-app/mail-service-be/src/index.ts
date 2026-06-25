import express from "express";

import dotenv from "dotenv";
dotenv.config();

// env variables defination
const port = process.env.PORT || 5001;

// express app initialization
const app = express();

// configure express middlewares
app.use(express.json());

const bootstrap = async () => {
  app.get("/health", (req, res) => {
    res.status(200).send({
      status: "up",
      message: "Mail service is up and running",
    });
  });

  // listen to the server
  app.listen(port, () => {
    console.log(`Mail service is running on  http://localhost:${port}/health`);
  });
};

bootstrap().catch((err) => {
  console.error("Error during bootstrap:", err);
  process.exit(1);
});
