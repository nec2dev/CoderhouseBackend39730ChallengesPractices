import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';

class TicketRouter {
    constructor() {
        this.router = Router();
        this.router.get(`/`, TicketController.getTickets);
        this.router.post(`/`, TicketController.createTicket);
        this.router.get(`/:tid`, TicketController.getTicketById);
        this.router.put(`/:tid`, TicketController.resolveTicket);
    }
    getRouter() {
        return this.router;
    }
}

export default new TicketRouter();