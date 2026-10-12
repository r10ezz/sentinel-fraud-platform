import { Router } from "express";

import { start } from "../controllers/simulation.controller";
import { authenticate, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

// Only ADMIN can initiate traffic simulations
router.post("/start", authorizeRole("ADMIN"), start);

export default router;