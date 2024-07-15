import { NextFunction, Response } from "express";

import { Request } from "../interface/request";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("RequestLoger");

export const RequestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`${req.method}:$${req.url}`);
  next();
};
