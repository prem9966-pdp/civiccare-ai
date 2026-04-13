import mongoose from "mongoose";
import { ENV } from "./env";

/**
 * Robust MongoDB Connection Function
 */
export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = ENV.MONGO_URI;

    // 1. Validate URI presence
    if (!mongoURI) {
        throw new Error("MONGO_URI is not defined in your .env file. Please check your environment variables.");
    }

    // 2. Extract host info for masked logging (Diagnostic Mode)
    // Format: mongodb+srv://user:pass@HOST/dbname
    let maskedHost = "Unknown Host";
    try {
        if (mongoURI.includes("@")) {
            const hostParts = mongoURI.split("@")[1].split("/")[0];
            maskedHost = hostParts;
        } else if (mongoURI.includes("://")) {
            const hostParts = mongoURI.split("://")[1].split("/")[0];
            maskedHost = hostParts;
        }
    } catch (e) {
        maskedHost = "Hidden Host";
    }

    console.log(`⏳ Attempting to connect to MongoDB host: ${maskedHost}...`);

    // 3. Connection Options (Standard for modern Mongoose)
    // mongoose.set('strictQuery', false); // Optional: if you want to silence warnings

    // 4. Perform the connection
    const connection = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Wait 5 seconds before failing
    });

    console.log(`
    -----------------------------------------
    ✅ MONGO_DB CONNECTED SUCCESSFULLY!
    -----------------------------------------
    🏰 DATABASE : ${connection.connection.name}
    🌐 HOST     : ${connection.connection.host}
    -----------------------------------------
    `);
    
  } catch (error: any) {
    console.error(`
    -----------------------------------------
    ❌ MONGO_DB CONNECTION FAILED!
    -----------------------------------------
    📝 ERROR: ${error.message}
    -----------------------------------------
    🔍 COMMON CAUSES:
    1. IP Whitelist: Check MongoDB Atlas -> Network Access
    2. Credentials: Check username/password in .env
    3. Network: Check your internet or VPN
    -----------------------------------------
    `);
    
    // Throw error so server.ts can handle it
    throw error;
  }
};