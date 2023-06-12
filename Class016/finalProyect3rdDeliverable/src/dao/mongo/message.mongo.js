import messageModel from "../../models/message.model.js";

export default class Message {
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