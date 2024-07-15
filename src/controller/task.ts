import httpStatusCodes from "http-status-codes";
import { Request } from "../interface/request";
import { NextFunction, Response } from "express";
import * as taskService from "../service/task";
import { Roles } from "../constant/Roles";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("auth controller");

export const addTask = (req: Request, res: Response) => {
  const newTask = req.body;
  const userId = req.user?.id!;

  const task = taskService.addTask(newTask, userId);

  logger.info("task add");
  res.status(httpStatusCodes.CREATED).json({ message: "Succesfully added!" });
};

export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id!;

  const tasks = taskService.getTasks(Number(userId));

  if (!tasks) {
    next(new BadRequestError(`Task with following  id ${userId} doesnt exist`));
    return;
  }

  res.status(httpStatusCodes.OK).json({ message: tasks });
};

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?.id!;
  const data = req.body;

  const updatedTask = taskService.updateTask(Number(id), data, userId);
  logger.info("task updated");

  if (!updatedTask) {
    next(new BadRequestError(`Task with following id: ${id} doesnt exist`));
    return;
  }

  res.status(httpStatusCodes.OK).json({ message: "Updated successfully!" });
};

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?.id!;

  const deleteTask = taskService.deleteTask(Number(id), userId);
  logger.info("task deleted");

  if (!deleteTask) {
    next(new BadRequestError(`Task with following id: ${id} doesnt exist`));
    return;
  }

  res.status(httpStatusCodes.OK).json({ message: "deleted successfully!" });
};
