import { Router } from "express";
import todoRoutes from "./task";
import userRoutes from "./user";
import authRoutes from "./auth";

const router = Router();

router.use("/users", userRoutes);
router.use("/todo", todoRoutes);
router.use("/auth", authRoutes);

export default router;
