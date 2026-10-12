import { Router } from "express";

import {
  getAll,
  getOne,
  assign,
  resolve,
} from "../controllers/case.controller";

import { authenticate, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/", getAll);

router.get("/:id", getOne);

// Only ADMIN and ANALYST can investigate, assign, and resolve cases
router.patch("/:id/assign", authorizeRole("ADMIN", "ANALYST"), assign);

router.patch("/:id/resolve", authorizeRole("ADMIN", "ANALYST"), resolve);

export default router;