import DAO from "../persistence/DAOs/factory.js";

const TicketManager = DAO.tickets;
const UserManager = DAO.users;

class TicketController {
  createTicket = async (req, res) => {
    const { user, cart } = req.body;
    let code = await TicketManager.createCode();
    let purchase_datetime = new Date();
    let resultUser = await UserManager.getById(user);
    res.send({ status: "success", result: result });
  };

  getTickets = async (req, res) => {
    let result = await TicketManager.getTickets();
    res.send({ status: "success", result: result });
  };

  getTicketById = async (req, res) => {
    res.send({ status: "success", result: result });
  };

  updateTicket = async (req, res) => {
    res.send({ status: "success", result: result });
  };

  deleteTicket = async (req, res) => {
    res.send({ status: "success", result: result });
  };

  resolveTicket = async (req, res) => {
    res.send({ status: "success", result: result });
  };
}
export default new TicketController();
