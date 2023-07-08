import DAO from '../persistence/DAOs/factory.js';

const messageManager = DAO.messages;
class MessageController {
  createMessage = async (req, res) => {
    const { user, message } = req.body;
    let newMessage = { user, message };
    const result = await messageManager.saveMessage(newMessage);
    res.send({ status: "success", payload: result });
  };
  
  getMessages = async (req, res) => {
    let messages = await messageManager.getMessages();
    res.send({ status: "success", payload: messages });
  };
  
  getMessageById = async (req, res) => {
    let id = req.params.mid;
    let message = await messageManager(id);
    res.send({ status: "success", payload: message });
  };
  
  updateMessage = async (req, res) => {
    let id = req.params.mid;
    const { user, message } = req.body;
    let updateMessage = { user, message };
    let result = await messageManager.updateMessage(id, updateMessage);
    res.send({ status: "success", payload: result });
  };
  
  deleteMessage = async (req, res) => {
    let id = req.params.mid;
    let result = await messageManager.deleteMessage(id);
    res.send({ status: "success", payload: result });
  };

}

export default new MessageController();