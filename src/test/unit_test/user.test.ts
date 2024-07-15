import { permissions } from "./../../constant/Permission";
import bcrypt from "bcrypt";
import sinon from "sinon";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../../service/user";
import expect from "expect";
import * as userModel from "../../model/user";
import { Roles } from "../../constant/Roles";

import { BadRequestError } from "../../error/BadRequestError";
import { error } from "winston";

describe("User Service Test Suite", () => {
  describe("createUser", () => {
    let bcryptHashStub: sinon.SinonStub;
    let userModelCreateUserStub: sinon.SinonStub;
    let getUserByEmailStub: sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = sinon.stub(bcrypt, "hash");
      getUserByEmailStub = sinon.stub(userModel, "getUserByEmail");
      userModelCreateUserStub = sinon.stub(userModel, "createUser");
    });

    afterEach(() => {
      bcryptHashStub.restore();
      userModelCreateUserStub.restore();
      getUserByEmailStub.restore();
    });
    //   const user = {
    //     id: 1,
    //     name: "test",
    //     email: "test@test.com",
    //     password: "password123",
    //     role: Roles.USER,
    //     permissions: [],
    //   };
    //   getUserByEmailStub.resolves(user);
    //   await expect(userModel.createUser(user)).toThrowError(
    //     "User already exists"
    //   );
    // });

    // it("should throw an error if user already exists", async () => {
    //   const mockUser = {
    //     id: 1,
    //     name: "Test",
    //     email: "test@test.com",
    //     password: "test1234",
    //     role: Roles.USER,
    //     permissions: [`${Roles.SUPERADMIN}`],
    //   };
    //   getUserByEmailStub.resolves(mockUser);

    //   await expect(
    //     async () => await userModel.createUser(mockUser)
    //   ).toThrowError("User already exists");
    // });

    it("should create user", async () => {
      bcryptHashStub.resolves("hashedPassword");
      const user = {
        id: 1,
        name: "test",
        email: "test@test.com",
        password: "password123",
        role: Roles.USER,
        permissions: [],
      };

      await createUser(user);

      expect(bcryptHashStub.callCount).toBe(1);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);

      expect(userModelCreateUserStub.callCount).toBe(1);
      expect(userModelCreateUserStub.getCall(0).args).toStrictEqual([
        { ...user, password: "hashedPassword" },
      ]);
    });
  });
  describe("getUsers", () => {
    let userModelGetUsersStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUsersStub = sinon.stub(userModel, "getUsers");
    });

    afterEach(() => {
      userModelGetUsersStub.restore();
    });

    it("should get users", () => {
      userModelGetUsersStub.returns([{ id: 1, name: "John Doe" }]);

      const result = getUsers();

      expect(userModelGetUsersStub.callCount).toBe(1);
      expect(result).toEqual([{ id: 1, name: "John Doe" }]);
    });

    it("should return null when no users are found", () => {
      userModelGetUsersStub.returns([]);
      const result = getUsers();
      expect(userModelGetUsersStub.callCount).toBe(1);
      expect(result).toBeNull();
    });
  });


  describe("updateUsers", () => {
    let userModelFindUserIndexByIdStub: sinon.SinonStub;
    let userModelUpdateUserStub: sinon.SinonStub;
    let bcryptHashStub: sinon.SinonStub;

    beforeEach(() => {
      userModelFindUserIndexByIdStub = sinon.stub(userModel, "findUserIndex");
      userModelUpdateUserStub = sinon.stub(userModel, "updateUser");
      bcryptHashStub = sinon.stub(bcrypt, "hash");
    });

    afterEach(() => {
      userModelFindUserIndexByIdStub.restore();
      userModelUpdateUserStub.restore();
      bcryptHashStub.restore();
    });

    it("should update user", async () => {
      const id = 1;
      const user = {
        id: 1,
        name: "updated",
        password: "newpassword",
        role: Roles.USER,
        permissions: [],
        email: "update@update.com",
      };
      const userIndex = 0;

      userModelFindUserIndexByIdStub.returns(userIndex);
      bcryptHashStub.resolves("hashedPassword");

      await updateUser(id, user);

      expect(userModelFindUserIndexByIdStub.callCount).toBe(1);
      expect(userModelFindUserIndexByIdStub.getCall(0).args).toStrictEqual([
        id,
      ]);
      expect(bcryptHashStub.callCount).toBe(1);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual(["newpassword", 10]);
      expect(userModelUpdateUserStub.callCount).toBe(1);
      expect(userModelUpdateUserStub.getCall(0).args).toStrictEqual([
        id,
        { ...user, password: "hashedPassword" },
        userIndex,
      ]);
    });

    it("should throw an error if user is not found", async () => {
      const id = 1;
      const user = {
        id: 1,
        name: "updated",
        password: "newpassword",
        role: Roles.USER,
        permissions: [],
        email: "update@update.com",
      };

      userModelFindUserIndexByIdStub.returns(-1);

      await expect(updateUser(id, user)).rejects.toThrow("user not found");

      expect(userModelFindUserIndexByIdStub.callCount).toBe(1);
      expect(userModelFindUserIndexByIdStub.getCall(0).args).toStrictEqual([
        id,
      ]);
      expect(bcryptHashStub.callCount).toBe(0);
      expect(userModelUpdateUserStub.callCount).toBe(0);
    });
  });

  describe("deleteUsers", () => {
    let userModelFindUserIndexByIdStub: sinon.SinonStub;
    let userModelDeleteUserStub: sinon.SinonStub;

    beforeEach(() => {
      userModelFindUserIndexByIdStub = sinon.stub(userModel, "findUserIndex");
      userModelDeleteUserStub = sinon.stub(userModel, "deleteUser");
    });

    afterEach(() => {
      userModelFindUserIndexByIdStub.restore();
      userModelDeleteUserStub.restore();
    });

    it("should delete user", () => {
      const id = 1;
      const userIndex = 0;

      userModelFindUserIndexByIdStub.returns(userIndex);

      deleteUser(id);

      expect(userModelFindUserIndexByIdStub.callCount).toBe(1);
      expect(userModelFindUserIndexByIdStub.getCall(0).args).toStrictEqual([
        id,
      ]);
      expect(userModelDeleteUserStub.callCount).toBe(1);
      expect(userModelDeleteUserStub.getCall(0).args).toStrictEqual([
        userIndex,
      ]);
    });

    it("should throw NotFoundError if user not found", () => {
      const id = 1;

      userModelFindUserIndexByIdStub.returns(-1);
      expect(() => deleteUser(id)).toThrow("user not found");
      expect(userModelFindUserIndexByIdStub.callCount).toBe(1);
      expect(userModelFindUserIndexByIdStub.getCall(0).args).toStrictEqual([
        id,
      ]);
    });
  });
});
