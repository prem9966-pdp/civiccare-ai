import dotenv from "dotenv";
import path from "path";

// Load .env from server root (parent of src)
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

console.log(`[ENV DEBUG] Loading .env from: ${envPath}`);

export const ENV = {
  PORT: process.env.PORT || 5051,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/civiccare",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  AI_API_KEY: process.env.AI_API_KEY || "",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || process.env.AI_API_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
};

console.log(`[ENV DEBUG] AI_API_KEY present: ${!!ENV.AI_API_KEY}`);
console.log(`[ENV DEBUG] GEMINI_API_KEY present: ${!!ENV.GEMINI_API_KEY}`);

