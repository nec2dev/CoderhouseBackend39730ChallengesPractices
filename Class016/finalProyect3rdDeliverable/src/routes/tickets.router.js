import { Router } from "express";
import ticketsController from "../controllers/ticket.controller.js";

const router = Router();

router.get("/", ticketsController.getTickets);
router.post("/", ticketsController.createTicket);
router.get("/:tid", ticketsController.getTicketById);
router.put("/:tid", ticketsController.resolveTicket);

export default router;
