import app from "./app";
import config from "./utils/config";
import logger from "./utils/logger";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

app.listen(Number(config.PORT), config.HOST, () => {
  logger.info(`Server running on http://${config.HOST}:${config.PORT}`);
});
