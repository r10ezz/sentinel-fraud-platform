import { Router } from "express";

import { getOverview } from "../controllers/analytics.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/", getOverview);

export default router;