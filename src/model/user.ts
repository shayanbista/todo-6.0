import { User } from "./../interface/user";
import { Roles } from "../constant/Roles";
import { permissions } from "../constant/Permission";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserModel");

export const users: User[] = [
  {
    id: 1,
    name: "shayan",
    password: "$2b$10$FccHNzxcZoCYZveakBpzE.jnGmXC1wdU8bilU/4EJF2TEgpi7GJle",
    email: "abc@gmail.com",
    role: Roles.USER,
    permissions: permissions[Roles.USER],
  },

  {
    id: 2,
    name: "superadmin",
    password: "$2b$10$FccHNzxcZoCYZveakBpzE.jnGmXC1wdU8bilU/4EJF2TEgpi7GJle",
    email: "super@gmail.com",
    role: Roles.SUPERADMIN,
    permissions: permissions[Roles.SUPERADMIN],
  },
];

export const createUser = (user: User) => {
  const newUser = {
    ...user,
    id: users.length + 1,
  };
  logger.info("users pushed to array");
  users.push(newUser);
};

export const getUsers = () => {
  return users;
};

export const getUserByEmail = (email: string) => {
  logger.info("finy user by email");
  return users.find((user) => user.email === email);
};

export const updateUser = (id: number, updatedData: User, index: number) => {
  users[index] = { ...users[index], ...updatedData };
  logger.info("updateUser");
  return [index];
};

export const deleteUser = (index: number): void => {
  logger.info("deleteUser");
  users.splice(index, 1);
};

export const findUserIndex = (id: number): number => {
  return users.findIndex((user) => user.id === id);
};

export const getUserByIndexId = (id: number) => {
  return users[id];
};

export const getUserById = (id: number) => {
  return users.find((user) => user.id === id);
};
