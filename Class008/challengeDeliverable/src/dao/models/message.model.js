const {Schema, model} = require('mongoose')

const messageCollection = 'products';
const messageSchema = new Schema({
    user:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

module.exports = model(messageCollection, messageSchema)