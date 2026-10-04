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
  }
  // TODO (P2): username o email repetido (E11000)
  else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    if (error.message.includes("index: username_1")) {
      response.status(400).json({ error: "expected `username` to be unique" });
    } else if (error.message.includes("index: email_1")) {
      response.status(400).json({ error: "expected `email` to be unique" });
    } else {
      response.status(400).json({ error: "duplicate key error" });
    }
  }
  // --- P4: token expirado (TokenExpiredError) ---
  else if (error.name === "TokenExpiredError") {
    response.status(401).json({ error: "token expired" });
  }
  else {
    next(error);
  }
};

// --- P4: verificar el JWT de la cookie `token` y el header `X-CSRF-Token`,
// y guardar el id del usuario en `req.userId`. ---
export const withUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "token missing" });
    return;
  }

  const decoded = jwt.verify(token, config.JWT_SECRET) as {
    id: string;
    csrf: string;
  };

  const csrfHeader = req.header("X-CSRF-Token");
  if (decoded.csrf !== csrfHeader) {
    res.status(401).json({ error: "invalid csrf token" });
    return;
  }

  req.userId = decoded.id;
  next();
};

// TODO (P5): withOptionalUser

export default { requestLogger, unknownEndpoint, errorHandler };
