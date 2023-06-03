import { Router } from "express";
import messageController from "../controllers/message.controller.js";

const router = Router();

router.get("/messages", messageController.getMessages);
router.post("/messages", messageController.createMessage);
router.get("/messages/:mid", messageController.getMessageById);
router.put("/messages/:mid", messageController.updateMessage);
router.delete("/messages/:mid", messageController.deleteMessage);

export default router;
