import mongoose from "mongoose";
import config from "../../config/env.config.js";
import logger from "../../utils/logger.js";

(async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    logger.info("Connected to the database successfully.");
  } catch (error) {
    logger.error("Database connection error.");
    logger.error(error);
  }
})();
