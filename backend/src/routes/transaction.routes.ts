import { Router } from "express";

import {
  create,
  getAll,
  getOne,
} from "../controllers/transaction.controller";

import { authenticate, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

// Admin and Analyst can create manual transactions; Viewers have read-only access
router.post("/", authorizeRole("ADMIN", "ANALYST"), create);

router.get("/", getAll);

router.get("/:id", getOne);

export default router;