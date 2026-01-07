// Centralized environment configuration
const required = (name: string, value: string | undefined) => {
  if (!value) {
    console.warn(`Environment variable ${name} is not set`);
  }
  return value ?? "";
};

export const POSTGRES_URL = required("POSTGRES_URL", process.env.POSTGRES_URL);
export const NEXTAUTH_SECRET = required(
  "NEXTAUTH_SECRET",
  process.env.NEXTAUTH_SECRET
);

export const NODE_ENV = process.env.NODE_ENV || "development";

const config = {
  POSTGRES_URL,
  NEXTAUTH_SECRET,
  NODE_ENV,
};

export default config;
