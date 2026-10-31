import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import config from "./utils/config";
import logger from "./utils/logger";
import middleware from "./utils/middleware";
import postsRouter from "./controllers/posts";
import usersRouter from "./controllers/users";
import loginRouter from "./controllers/login";
import testingRouter from "./controllers/testing"; /* p3: Se agrega el router de testing e2e */

const app = express();

mongoose.set("strictQuery", false);

if (config.MONGODB_URI) {
  mongoose
    .connect(config.MONGODB_URI, { dbName: config.MONGODB_DBNAME })
    .then(() => logger.info("connected to MongoDB"))
    .catch((error) => {
      logger.error("error connecting to MongoDB:", error.message);
    });
}

app.use(express.static("dist"));
app.use(express.json());
app.use(cookieParser());
app.use(middleware.requestLogger);

/* p3: agregamos ruta de testing */
if (config.NODE_ENV === "development" || config.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}
/* fin cambios p3 */

app.use("/api", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
