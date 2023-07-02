import { Router } from 'express';
import LoggerController from '../controllers/logger.controller.js';

class LoggerRouter {
    constructor() {
        this.router = Router();
        this.router.get('/', LoggerController.testLogger);
    }

    getRouter() {
        return this.router;
    }
}

export default new LoggerRouter();