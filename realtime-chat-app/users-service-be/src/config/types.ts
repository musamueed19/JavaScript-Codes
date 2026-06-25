export type DatabaseConfig = {
  dbURI: string;
};

export type RedisConfig = {
  redisURL: string;
};

export type BrokerConfig = { hostname: string; port: number; username: string; password: string; }