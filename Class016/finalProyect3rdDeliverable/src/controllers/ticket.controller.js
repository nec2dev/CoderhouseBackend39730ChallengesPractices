import TicketManager from "../dao/mongo/ticket.mongo.js";
import UserManager from "../dao/mongo/user.mongo.js";

const ticketManager = new TicketManager();
const userManager = new UserManager();

const createTicket = async (req, res) => {
  const { user, cart } = req.body;
  let code = await ticketManager.createCode();
  let purchase_datetime = new Date();
  let resultUser = await userManager.getById(user);
  res.send({ status: "success", result: result });
};

const getTickets = async (req, res) => {
  let result = await ticketManager.getAll();
  res.send({ status: "success", result: result });
};

const getTicketById = async (req, res) => {
  res.send({ status: "success", result: result });
};

const updateTicket = async (req, res) => {
  res.send({ status: "success", result: result });
};

const deleteTicket = async (req, res) => {
  res.send({ status: "success", result: result });
};

const resolveTicket = async (req, res) => {
  res.send({ status: "success", result: result });
};

export default {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  resolveTicket,
};
