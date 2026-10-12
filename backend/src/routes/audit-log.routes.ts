import { Router } from "express";
import { authenticate, authorizeRole } from "../middleware/auth.middleware";

import { getAll } from "../controllers/audit-log.controller";

const router = Router();

router.use(authenticate);

// Only ADMIN and ANALYST can view audit logs
router.get("/", authorizeRole("ADMIN", "ANALYST"), getAll);

export default router;