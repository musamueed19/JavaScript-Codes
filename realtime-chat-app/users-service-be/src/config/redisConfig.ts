import type { RedisConfig } from "./types.js";

export const getRedisConfig = (): RedisConfig => {
  const redisURL = process.env.REDIS_URL as string | undefined;
  if (!redisURL) {
    throw new Error(
      "REDIS_URL environment variable is missing. It is required for redis connection."
    );
  }
  return { redisURL };
};
