import { createClient } from "redis";
import { getRedisConfig } from "../config/redisConfig.js";

export type RedisClient = Awaited<ReturnType<typeof getRedisClient>>;

export const getRedisClient = async () => {
  const {redisURL: url} = getRedisConfig();
  // Initialize and return the Redis client instance
  const client = createClient({
    url,
  });
  client.on("error", (err) => {
    console.error("❌ Redis error:", err);
  });

  try {
    const connection = await client.connect();
    console.log("✅ Redis conencted successfully", connection);
    return client;
  } catch (error) {
    console.error("Failed to initialize Redis client", error);
    throw error;
  }
};
