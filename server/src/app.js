import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import healthRoutes from "./routes/health.routes.js";
import interviewRoutes from "./routes/interview.routes.js"
import {
  errorHandler,
  notFound
} from "./middlewares/error.middleware.js";
const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan("dev"));

// Routes

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/interview",interviewRoutes)


// 404
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;