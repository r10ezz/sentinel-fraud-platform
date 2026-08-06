import { Router } from "express";

import {
  create,
  getAll,
  getOne,
} from "../controllers/transaction.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", create);

router.get("/", getAll);

router.get("/:id", getOne);

export default router;