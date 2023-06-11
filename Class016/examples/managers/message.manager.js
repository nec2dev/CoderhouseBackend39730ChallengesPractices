import messageModel from "../mongo/models/message.model.js";

export default class MessageManager {
  constructor() {
    console.log("Working in mongoDB with Messages");
  }

  createMessage = async (message) => {
    let result = await messageModel.create(message);
    return result;
  };

  getMessages = async () => {
    let messages = await messageModel.find().lean();
    return messages;
  };
}
