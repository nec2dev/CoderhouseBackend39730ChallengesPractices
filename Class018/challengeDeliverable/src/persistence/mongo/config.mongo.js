import mongoose from "mongoose";
import config from "../../config/env.config.js";
import logger from "../../utils/logger.js";

(async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    logger.info("Conectado a la base de datos correctamente.");
  } catch (error) {
    logger.error("Error de conexión a la base de datos.");
    logger.error(error);
  }
})();
