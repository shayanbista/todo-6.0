import { Router } from "express";
import { addTask, updateTask, deleteTask, getTasks } from "../controller/task";
import { authenticate, authorize } from "../middleware/auth";
import {
  createTaskBodySchema,
  taskIdSchema,
  updateTaskBodySchema,
} from "../schema/task";
import { validateReqBody, validateReqParams } from "../middleware/validator";

const todoRouter = Router();
todoRouter.post(
  "/",
  authenticate,
  validateReqBody(createTaskBodySchema),
  addTask
);
todoRouter.get("/", authenticate, getTasks);
todoRouter.put(
  "/:id",
  authenticate,
  validateReqParams(taskIdSchema),
  validateReqBody(updateTaskBodySchema),
  updateTask
);
todoRouter.delete("/:id", authenticate, deleteTask);

export default todoRouter;
