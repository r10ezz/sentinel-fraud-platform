"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const case_controller_1 = require("../controllers/case.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get("/", case_controller_1.getAll);
router.get("/:id", case_controller_1.getOne);
// Only ADMIN and ANALYST can investigate, assign, and resolve cases
router.patch("/:id/assign", (0, auth_middleware_1.authorizeRole)("ADMIN", "ANALYST"), case_controller_1.assign);
router.patch("/:id/resolve", (0, auth_middleware_1.authorizeRole)("ADMIN", "ANALYST"), case_controller_1.resolve);
exports.default = router;
