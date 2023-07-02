import logger from "../utils/logger.js"

export const createLog = (req, res, next) =>{
    logger.info(`Method: ${req.method} - URL: ${req.url} - date: ${Date().toString()}`);
    next();
}