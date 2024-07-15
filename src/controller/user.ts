import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
import * as userService from "../service/user";
import httpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { ConflictError } from "../error/ConflictError";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("user controller");

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  const users = userService.getUsers();
  if (!users) {
    next(new BadRequestError("users dont exist"));
  } else res.status(httpStatusCodes.OK).json({ message: users });
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return next(new BadRequestError("Invalid user ID"));
    }

    const user = userService.getUserById(Number(id));

    if (!user) {
      return next(new BadRequestError("User does not exist"));
    }

    res.status(httpStatusCodes.OK).json({ message: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const data = await userService.createUser(body);
  if (!data) {
    next(new ConflictError("email already exists"));
  }
  res.status(httpStatusCodes.CREATED).json({ message: "created successfully" });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = req.body;

  const user = await userService.updateUser(Number(id), data);

  if (!user) {
    next(new BadRequestError("id doesnot exist"));
  }
  res.status(httpStatusCodes.OK).json({ message: user });
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const message = userService.deleteUser(id);
  console.log("messae", message);
  res.status(httpStatusCodes.OK).json({ message });
};
