import { NextFunction } from "express";
import { Todo } from "../interface/task";
import * as taskModel from "../model/task";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("TaskModel");

export const addTask = (newTask: Todo, userId: number) => {
  const task = taskModel.addTask(newTask, userId);
  return true;
};

export const getTasks = (userId: number) => {
  const tasks = taskModel.findTasksByUserId(userId);

  if (tasks.length === 0) {
    logger.info("No tasks found");
    return null;
  }
  logger.info("Tasks returned");
  return tasks;
};

export const updateTask = (id: number, updatedData: Todo, userId: number) => {
  const task = taskModel.findTaskById(id, userId);
  if (!task) return null;

  if (task.userId !== userId) {
    logger.info("null task");
    return null;
  }

  const index = taskModel.findTaskIndexById(id);
  if (index == -1) throw new BadRequestError("id doesnot exist");

  return taskModel.updateTask(id, updatedData, index);
};

export const deleteTask = (id: number, userId: number) => {
  const task = taskModel.findTaskById(id, userId);
  if (!task) return null;

  if (task.userId !== userId) {
    return null;
  }

  const index = taskModel.findTaskIndexById(id);
  if (index === -1) return null;
  logger.info("delete task");
  taskModel.deleteTask(id);
  return true;
};
