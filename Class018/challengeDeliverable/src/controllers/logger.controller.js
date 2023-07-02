// import DAO from '../persistence/DAOs/factory.js';
import logger from "../utils/logger.js";
class LoggerController {
  testLogger = async (req, res) => {
    try {
      logger.fatal("fatal");
      logger.error("error");
      logger.warn("warn");
      logger.info("info");
      logger.http("http");
      logger.debug("debug");
      res.json({ message: "Test finished." });
    } catch (error) {
      logger.error("An error has occurred.");
    }
  };
}

export default new LoggerController();
