import type { DatabaseConfig } from "./types.js";

export const getDatabaseConfig = (): DatabaseConfig => {
  const dbURI = process.env.DB_URI as string | undefined;
  if (!dbURI) {
    throw new Error(
      "DB_URI environment variable is missing. It is required for database connection."
    );
  }
  return { dbURI };
};
