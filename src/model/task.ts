import { Todo } from "../interface/task";
import { Tasklist } from "../interface/tasklist";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TaskModel");

export const taskLists: Tasklist = [
  {
    userId: 1,
    id: 1,
    taskName: "Complete assignment",
    isCompleted: false,
    createdAt: new Date("2000-12-12"),
  },
  {
    userId: 1,
    id: 2,
    taskName: "Wash the dishes",
    isCompleted: false,
    createdAt: new Date("2000-10-12"),
  },
  {
    userId: 2,
    id: 3,
    taskName: "learn about containers and docker",
    isCompleted: false,
    createdAt: new Date("2001-12-12"),
  },
  {
    userId: 1,
    id: 4,
    taskName: "call mom",
    isCompleted: false,
    createdAt: new Date("2000-02-12"),
  },
];

export const addTask = (newTask: Todo, userId: number) => {
  logger.info("addTask");
  const task = {
    userId: userId,
    id: taskLists.length + 1,
    taskName: newTask.taskName,
    createdAt: new Date(),
    isCompleted: false,
    deletedAt: null,
  };
  taskLists.push(task);
};

export const findTasksByUserId = (userId: number) => {
  return taskLists.filter((task) => {
    return task.userId === userId;
  });
};

export const getTasks = () => {
  logger.info("getallTasks");
  return taskLists;
};

export const findTaskIndexById = (id: number): number => {
  return taskLists.findIndex((task) => task.id === id);
};

export const findTaskById = (taskId: number, userId: number) => {
  return taskLists.find((task) => {
    return task.id === taskId && task.userId === userId;
  });
};

export const updateTask = (id: number, updatedData: Todo, index: number) => {
  logger.info("updateTask");
  taskLists[index] = { ...taskLists[index], ...updatedData };
  return taskLists[index];
};

export const deleteTask = (index: number): void => {
  logger.info("deleteTask");
  taskLists.splice(index, 1);
};
