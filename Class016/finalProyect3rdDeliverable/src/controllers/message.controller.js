import MessageManager from "../dao/mongo/message.mongo.js";

const messageManager = new MessageManager();

const createMessage = async (req, res) => {
  const { user, message } = req.body;
  let newMessage = { user, message };
  const result = await messageManager.saveMessage(newMessage);
  res.send({ status: "success", payload: result });
};

const getMessages = async (req, res) => {
  let messages = await messageManager.getAll();
  res.send({ status: "success", payload: messages });
};

const getMessageById = async (req, res) => {
  let id = req.params.mid;
  let message = await messageManager.getOne(id);
  res.send({ status: "success", payload: message });
};

const updateMessage = async (req, res) => {
  let id = req.params.mid;
  const { user, message } = req.body;
  let updateMessage = { user, message };
  let result = await messageManager.updateMessage(id, updateMessage);
  res.send({ status: "success", payload: result });
};

const deleteMessage = async (req, res) => {
  let id = req.params.mid;
  let result = await messageManager.deleteMessage(id);
  res.send({ status: "success", payload: result });
};

export default {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
