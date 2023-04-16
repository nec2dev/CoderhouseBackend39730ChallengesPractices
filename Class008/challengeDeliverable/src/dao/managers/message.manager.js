import messageModel from "../models/message.model.js";
export default class Messages{
    constructor(){
        console.log("Working in mongoDB with Messages");
    }

    getAll = async() => {
        let messages = await messageModel.find().lean();
        return messages;
    }

    saveMessage = async(message) => {
        let result = await messageModel.create(message);
        return result;
    }
}