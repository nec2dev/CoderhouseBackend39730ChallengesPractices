import messagesModel from "../models/messages.model.js";
export default class Messages{
    constructor(){
        console.log("Working in mongoDB with Messages");
    }

    getAll = async() => {
        let messages = await messagesModel.find().lean();
        return messages;
    }

    saveMessage = async(message) => {
        let result = await messagesModel.create(message);
        return result;
    }
}