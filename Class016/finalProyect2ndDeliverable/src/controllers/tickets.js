import TicketManager from "../dao/managers/ticket.manager.js";
import UserManager from "../dao/managers/user.manager.js";

const ticketManager = new TicketManager();
const userManager = new UserManager();

const getTickets = async (req, res) => {
  let result = await ticketManager.getAll();
  res.send({ status: "success", result: result });
};

const createTicket = async (req, res) => {
  const { user, cart } = req.body;
  let code = await ticketManager.createCode();
  let purchase_datetime = new Date();
  let resultUser = await userManager.getById(user);
  res.send({ status: "success", result: result });
};

const getTicketById = async (req, res) => {
  res.send({ status: "success", result: result });
};

const resolveTicket = async (req, res) => {
  res.send({ status: "success", result: result });
};
