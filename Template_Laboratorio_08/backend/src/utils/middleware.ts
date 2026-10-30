import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "./config";
import logger from "./logger";

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: { name: string; message: string },
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    const field = error.message.includes("email") ? "email" : "username";
    response.status(400).json({ error: `expected \`${field}\` to be unique` });
  } else if (error.name === "TokenExpiredError") {
    response.status(401).json({ error: "token expired" });
  } else {
    next(error);
  }
};

export const withUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ error: "missing token" });
      return;
    }
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    const csrfToken = req.headers["x-csrf-token"];
    if (
      typeof decodedToken === "object" &&
      decodedToken.id &&
      decodedToken.csrf === csrfToken
    ) {
      req.userId = decodedToken.id;
      next();
    } else {
      res.status(401).json({ error: "invalid token" });
    }
  } catch {
    res.status(401).json({ error: "invalid token" });
  }
};

export const withOptionalUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.cookies?.token) {
    next();
    return;
  }
  await withUser(req, res, next);
};

export default { requestLogger, unknownEndpoint, errorHandler };
