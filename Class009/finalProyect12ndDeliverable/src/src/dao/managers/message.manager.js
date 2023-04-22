import messageModel from '../models/message.model.js' 

class MessageManager{
    constructor(){
        console.log("Working in mongoDB with Messages")
    }

    getAll = async() => {
        let messages = await messageModel.find().lean()
        return messages;
    }

    saveMessage = async(message) => {
        let result = await messageModel.create(message)
        return result;
    }
}

module.exports = new MessageManager()