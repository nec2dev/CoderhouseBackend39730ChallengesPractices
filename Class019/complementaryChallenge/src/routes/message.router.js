import { Router } from "express";
import MessageController from "../controllers/message.controller.js";

class MessageRouter {
  constructor() {
    this.router = Router();
    this.router.get("/messages", MessageController.getMessages);
    this.router.post("/messages", MessageController.createMessage);
    this.router.get("/messages/:mid", MessageController.getMessageById);
    this.router.put("/messages/:mid", MessageController.updateMessage);
    this.router.delete("/messages/:mid", MessageController.deleteMessage);
  }
  getRouter() {
    return this.router;
  }
}

export default new MessageRouter;
