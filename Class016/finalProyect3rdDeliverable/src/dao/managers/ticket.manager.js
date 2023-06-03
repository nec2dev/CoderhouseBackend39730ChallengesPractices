import ticketModel from "../models/ticket.model.js";

export default class Tickets {
  constructor() {
    console.log("Working in mongoDB with tickets");
  }

  createTicket = async (ticket) => {
    try {
      let result = await ticketModel.create(ticket);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getTickets = async () => {
    try {
      let products = await ticketModel.find();
      return products;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getTicketById = async (id) => {
    try {
      let product = await ticketModel.findOne({ _id: id });
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  resolveTicket = async (id, ticket) => {
    try {
      let updateTicket = await ticketModel.updateOne(
        { _id: id },
        { $set: ticket }
      );
      return updateTicket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createCode = async () => {
    try {
      let isCodeUnique = false;
      let ticketCode;
      while (!isCodeUnique) {
        ticketCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const existingTicket = await ticketModel.findOne({ code: ticketCode });
        if (!existingTicket) {
          isCodeUnique = true;
        }
      }
      return ticketCode;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
