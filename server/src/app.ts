import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { corsOptions } from "./config/cors";
import { requestLogger } from "./config/logger";
import { errorMiddleware } from "./middleware/error.middleware";
import { notFoundMiddleware } from "./middleware/not-found.middleware";
import { rateLimitMiddleware } from "./middleware/rate-limit.middleware";
import { ApiResponse } from "./utils/ApiResponse";

// Routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import schemeRoutes from "./routes/scheme.routes";
import recommendationRoutes from "./routes/recommendation.routes";
import chatRoutes from "./routes/chat.routes";
import documentRoutes from "./routes/document.routes";
import hospitalRoutes from "./routes/hospital.routes";
import notificationRoutes from "./routes/notification.routes";
import adminRoutes from "./routes/admin.routes";
import grievanceRoutes from "./routes/grievance.routes";

const app: Application = express();

// 0️⃣  DIAGNOSTIC MIDDLEWARE (Log EVERYTHING)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[NETWORK] Incoming: ${req.method} ${req.url}`);
  next();
});

// 1️⃣  Logger (Runs early)
app.use(requestLogger);

// 2️⃣  Primary Health Check (High priority, no auth/limiter)
app.get("/health", (req: Request, res: Response) => {
  console.log("--- HEALTH CHECK HIT ---");
  return res
    .status(200)
    .json(new ApiResponse(200, { status: "UP", message: "If you see this, connectivity is good!" }, "Health OK"));
});

// 3️⃣  Body Parser (MUST BE BEFORE ROUTES)
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// 4️⃣  Security Middlewares (Applied after health check for easier debugging)
app.use(helmet());
app.use(cors(corsOptions));
app.use(rateLimitMiddleware);

// 5️⃣  API Routes Mounting
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/schemes", schemeRoutes);
app.use("/api/v1/recommendation", recommendationRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/document", documentRoutes);
app.use("/api/v1/hospitals", hospitalRoutes);
app.use("/api/v1/grievance", grievanceRoutes);
app.use("/api/v1/notification", notificationRoutes);
app.use("/api/v1/admin", adminRoutes);

// 6️⃣  Error Handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };
export default app;