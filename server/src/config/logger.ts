import morgan from "morgan";
import { ENV } from "./env";

// Format: method, url, status, response-time, etc.
const format = ENV.NODE_ENV === "development" ? "dev" : "combined";

export const requestLogger = morgan(format);
