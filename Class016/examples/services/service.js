const {
  CartDAO,
  MessageDAO,
  ProductDAO,
  SessionDAO,
  TicketDAO,
  UserDAO,
} = require("../../finalProyect3rdDeliverable/src/dao/factory.js");

const CartRepository = require("../repositories/cart.repository.js");
const MessageRepository = require("../repositories/message.repository.js");
const ProductRepository = require("../repositories/product.repository.js");
const SessionRepository = require("../repositories/session.repository.js");
const TicketRepository = require("../repositories/ticket.repository.js");
const UserRepository = require("../repositories/user.repository.js");
const cartService = new CartRepository(new CartDAO());
const messageService = new MessageRepository(new MessageDAO());
const productService = new ProductRepository(new ProductDAO());
const sessionService = new SessionRepository(new SessionDAO());
const ticketService = new TicketRepository(new TicketDAO());
const userService = new UserRepository(new UserDAO());

module.exports = {
  cartService,
  messageService,
  productService,
  sessionService,
  ticketService,
  userService,
};
