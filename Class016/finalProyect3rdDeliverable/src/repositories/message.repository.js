const Repository = require("./repository.js")

class MessageRepository extends Repository {
    constructor(dao){ super(dao) }
  createMessage = async (message) => {
    let result = await messageModel.create(message);
    return result;
  };

  getMessages = async () => {
    let messages = await messageModel.find().lean();
    return messages;
  };
}

module.exports = MessageRepository
