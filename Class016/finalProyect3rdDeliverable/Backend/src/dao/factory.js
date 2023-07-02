const MongoSingleton = require("../utils/mongo.js");

let CartDAO;
let MessageDAO;
let ProductDAO;
let SessionDAO;
let TicketDAO;
let UserDAO;

switch ("MONGO") {
  case "FILE":
    const CartDAOFile = require("./file/cart.file.js");
    const MessageDAOFile = require("./file/message.file.js");
    const ProductDAOFile = require("./file/product.file.js");
    const SessionDAOFile = require("./file/session.file.js");
    const TicketDAOFile = require("./file/ticket.file.js");
    const UserDAOFile = require("./file/user.file.js");
    break;
  case "MEMORY":
    const CartDAOMemory = require("./memory/cart.memory.js");
    const MessageDAOMemory = require("./memory/message.memory.js");
    const ProductDAOMemory = require("./memory/product.memory.js");
    const SessionDAOMemory = require("./memory/session.memory.js");
    const TicketDAOMemory = require("./memory/ticket.memory.js");
    const UserDAOMemory = require("./memory/user.memory.js");
    break;
  case "MONGO":
    MongoSingleton.getInstance();
    const CartDAOMongo = require("./models/cart.model.js");
    CartDAO = CartDAOMongo;
    const MessageDAOMongo = require("./models/message.model.js");
    MessageDAO = MessageDAOMongo;
    const ProductDaoMongo = require("./models/product.model.js");
    ProductDAO = ProductDaoMongo;
    const SessionDAOMongo = require("./models/session.model.js");
    SessionDAO = SessionDAOMongo;
    const TicketDAOMongo = require("./models/ticket.model.js");
    TicketDAO = TicketDAOMongo;
    const UserDAOMongo = require("./models/user.model.js");
    UserDAO = UserDAOMongo;
    break;
  default:
    MongoSingleton.getInstance();
    break;
}

module.exports = {
  CartDAO,
  MessageDAO,
  ProductDAO,
  SessionDAO,
  TicketDAO,
  UserDAO,
};
