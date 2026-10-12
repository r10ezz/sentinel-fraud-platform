import express from "express";
import cors from "cors";

import { env } from "./config/env";

import authRoutes from "./routes/auth.routes";
import transactionRoutes from "./routes/transaction.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import caseRoutes from "./routes/case.routes";
import analyticsRoutes from "./routes/analytics.routes";
import auditLogRoutes from "./routes/audit-log.routes";
import simulationRoutes from "./routes/simulation.routes";

const app = express();

app.use(
  cors({
    origin:
      env.FRONTEND_URL === "*"
        ? true
        : [env.FRONTEND_URL, "http://localhost:3000"].filter(Boolean),
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/simulation", simulationRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Fraud Monitoring API is running 🚀",
  });
});

export default app;
