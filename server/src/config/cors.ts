import { CorsOptions } from "cors";
import { ENV } from "./env";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allows requests from localhost or a defined domain
    if (!origin || ENV.CORS_ORIGIN === "*" || ENV.CORS_ORIGIN === origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
