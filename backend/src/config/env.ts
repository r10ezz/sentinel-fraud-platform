import dotenv from "dotenv";

dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  PORT: process.env.PORT || "5000",
  JWT_SECRET: requireEnv("JWT_SECRET"),
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
};
