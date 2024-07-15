import httpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import * as authServices from "../service/auth";
import { BadRequestError } from "../error/BadRequestError";
import { ConflictError } from "../error/ConflictError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("auth controller");

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const data = await authServices.login(body);
  if (data) {
    res.status(httpStatusCodes.OK).json({ message: data });
  } else {
    logger.info("logged in");
    next(new BadRequestError(`following  id doesnt exist`));
    return;
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(" ");
    const newToken = await authServices.refreshToken(token[1]);

    res.status(httpStatusCodes.CREATED).json(newToken);
  } else {
    next(new BadRequestError("authentication doesnt exist"));
  }
};
