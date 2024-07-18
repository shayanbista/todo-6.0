import { User } from "./../interface/user";
import { UserModel } from "./../model/UserModel";
import bcrypt from "bcrypt";
import * as userModel from "../model/user";
import { Roles } from "../constant/Roles";
import { permissions } from "../constant/Permission";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";
import * as UserModel1 from "../model/UserModel";

const logger = loggerWithNameSpace("User Service");

export const createUser = async (user: User) => {
  // const existingUser = getUserByEmail(user.email);
  const newUser = await UserModel1.UserModel.create(user);
  if (!newUser) {
    return null;
  } else {
    return true;
  }
};

export const getUsers = () => {
  const users = userModel.getUsers();
  if (users.length == 0) {
    return null;
  } else return users;
};

export const getUserByEmail = (email: string) => {
  return userModel.getUserByEmail(email);
};

export const getUserById = (id: number) => {
  const user = userModel.getUserById(id);
  if (!user) return null;
  return user;
};

export const updateUser = async (id: number, user: User) => {
  let password: string;

  // find the index of user
  const usersIndex = userModel.findUserIndex(id);

  if (usersIndex === -1) {
    throw new BadRequestError("user not found");
  }
  const existingUser = userModel.getUserByIndexId(id);

  // check the password from request
  if (user.password) {
    password = await bcrypt.hash(user.password, 10);
  } else {
    password = existingUser.password;
  }
  logger.info("password", password);
  user.password = password;
  userModel.updateUser(id, user, usersIndex);
  return { message: "User updated" };
};

export const deleteUser = (id: number) => {
  const userIndex = userModel.findUserIndex(id);
  if (userIndex === -1) throw new BadRequestError("user not found");
  userModel.deleteUser(userIndex);
  logger.info("User deleted");
  return { message: "users deleted" };
};
