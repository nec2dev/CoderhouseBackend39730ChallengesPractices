import config from "../../config/env.config.js";
import CartsMongo from "./cartsDAOs/cart.mongo.js";
import MessagesMongo from "./messagesDAOs/message.mongo.js";
import ProductsMongo from "./productsDAOs/product.mongo.js";
import SessionsMongo from "./sessionsDAOs/session.mongo.js";
import TicketsMongo from "./ticketsDAOs/ticket.mongo.js";
import UsersMongo from "./usersDAOs/user.mongo.js";

let DAO = {
  users: null,
  carts: null,
  products: null,
};

switch (config.PERSISTENCE) {
  case "MONGO":
    await import("../mongo/config.mongo.js");
    DAO.carts = new CartsMongo();
    DAO.messages = new MessagesMongo();
    DAO.products = new ProductsMongo();
    DAO.sessions = new SessionsMongo();
    DAO.tickets = new TicketsMongo();
    DAO.users = new UsersMongo();
    break;
  default:
    await import("../mongo/config.mongo.js");
    DAO.carts = new CartsMongo();
    DAO.messages = new MessagesMongo();
    DAO.products = new ProductsMongo();
    DAO.sessions = new SessionsMongo();
    DAO.tickets = new TicketsMongo();
    DAO.users = new UsersMongo();
    break;
}

export default DAO;
