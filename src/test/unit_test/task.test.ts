import { expect } from "expect";
import sinon from "sinon";
import * as taskService from "../../service/task";
import * as taskModel from "../../model/task";
import loggerWithNameSpace from "../../utils/logger";
import { getTasks } from "../../service/task";

const logger = loggerWithNameSpace("TaskModel");

describe("Task Service Test Suite", () => {
  describe("addTask", () => {
    let taskModelAddTaskStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelAddTaskStub = sinon.stub(taskModel, "addTask");
    });

    afterEach(() => {
      taskModelAddTaskStub.restore();
    });

    it("should add a task", () => {
      const newTask = {
        id: 1,
        title: "Test Task",
        description: "Test Description",
        userId: 1,
        taskName: "Task Name",
        isCompleted: false,
        createdAt: new Date(),
      };

      const userId = 1;

      taskModelAddTaskStub.returns(true);

      const result = taskService.addTask(newTask, userId);

      expect(taskModelAddTaskStub.callCount).toBe(1);
      expect(taskModelAddTaskStub.calledWith(newTask, userId)).toBe(true);
      expect(result).toBe(true);
    });
  });

  describe("deleteTask", () => {
    let taskModelFindTaskByIdStub: sinon.SinonStub;
    let taskModelDeleteUserStub: sinon.SinonStub;
    let loggerInfoStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelFindTaskByIdStub = sinon.stub(taskModel, "findTaskById");
      taskModelDeleteUserStub = sinon.stub(taskModel, "deleteTask");
      loggerInfoStub = sinon.stub(logger, "info");
    });

    afterEach(() => {
      taskModelFindTaskByIdStub.restore();
      taskModelDeleteUserStub.restore();
      loggerInfoStub.restore();
    });

    it("should delete task", () => {
      const id = 1;
      const userId = 1;
      const task = { id: 1, userId: 1 };

      const result = taskService.deleteTask(id, userId);

      expect(result).toEqual(true);
    });

    it("should return null if task not found", () => {
      const id = 1;
      const userId = 1;

      taskModelFindTaskByIdStub.returns(null);

      const result = taskService.deleteTask(id, userId);

      expect(taskModelFindTaskByIdStub.callCount).toEqual(1);
      expect(taskModelFindTaskByIdStub.calledWith(id, userId)).toEqual(true);
      expect(taskModelDeleteUserStub.callCount).toEqual(0);
      expect(loggerInfoStub.callCount).toEqual(0);
      expect(result).toEqual(null);
    });

    it("should return null if task does not belong to user", () => {
      const id = 1;
      const userId = 1;
      const task = { id: 1, title: "Test Task", userId: 2 };

      taskModelFindTaskByIdStub.returns(task);

      const result = taskService.deleteTask(id, userId);

      expect(taskModelFindTaskByIdStub.callCount).toEqual(1);
      expect(taskModelFindTaskByIdStub.calledWith(id, userId)).toEqual(true);
      expect(taskModelDeleteUserStub.callCount).toEqual(0);
      expect(loggerInfoStub.callCount).toEqual(0);
      expect(result).toEqual(null);
    });
  });

  describe("getTasks", () => {
    let findTasksStub: sinon.SinonStub;
    let loggerStub: sinon.SinonStub;

    beforeEach(() => {
      findTasksStub = sinon.stub(taskModel, "findTasksByUserId");
      loggerStub = sinon.stub(logger, "info");
    });

    afterEach(() => {
      findTasksStub.restore();
      loggerStub.restore();
    });

    it("should get all tasks", () => {
      const tasks = [
        {
          userId: 1,
          id: 1,
          taskName: "Complete assignment",
          isCompleted: false,
          createdAt: new Date(),
        },
      ];

      findTasksStub.returns(tasks);

      const result = getTasks(1);

      expect(result).toBe(tasks);
    });

    it("should return null and log info if no tasks are found", () => {
      findTasksStub.returns([]);
      const result = getTasks(1);
      expect(result).toEqual(null);
    });
  });


  describe("Task Service Test Suite", () => {
    let taskModelFindTaskByIdStub: sinon.SinonStub;
    let taskModelFindTaskIndexByIdStub: sinon.SinonStub;
    let taskModelUpdateTaskStub: sinon.SinonStub;
    let loggerInfoStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelFindTaskByIdStub = sinon.stub(taskModel, "findTaskById");
      taskModelFindTaskIndexByIdStub = sinon.stub(
        taskModel,
        "findTaskIndexById"
      );
      taskModelUpdateTaskStub = sinon.stub(taskModel, "updateTask");
      loggerInfoStub = sinon.stub(logger, "info");
    });

    afterEach(() => {
      taskModelFindTaskByIdStub.restore();
      taskModelFindTaskIndexByIdStub.restore();
      taskModelUpdateTaskStub.restore();
      loggerInfoStub.restore();
    });

    it("should update task successfully", () => {
      const id = 1;
      const userId = 1;
      const updatedData = {
        id: 1,
        title: "Updated Task",
        userId: 1,
        taskName: "Updated Task Name",
        isCompleted: false,
        createdAt: new Date(),
      };
      const task = {
        id: 1,
        title: "Test Task",
        userId: 1,
        taskName: "Test Task Name",
        isCompleted: false,
        createdAt: new Date(),
      };
      const index = 0;

      taskModelFindTaskByIdStub.returns(task);
      taskModelFindTaskIndexByIdStub.returns(index);
      taskModelUpdateTaskStub.returns(updatedData);

      const result = taskService.updateTask(id, updatedData, userId);

      expect(taskModelFindTaskByIdStub.callCount).toEqual(1);
      expect(taskModelFindTaskByIdStub.calledWith(id, userId)).toEqual(true);
      expect(taskModelFindTaskIndexByIdStub.callCount).toEqual(1);
      expect(taskModelFindTaskIndexByIdStub.calledWith(id)).toEqual(true);
      expect(taskModelUpdateTaskStub.callCount).toEqual(1);
      expect(
        taskModelUpdateTaskStub.calledWith(id, updatedData, index)
      ).toEqual(true);
      expect(result).toEqual(updatedData);
    });
  });
});
