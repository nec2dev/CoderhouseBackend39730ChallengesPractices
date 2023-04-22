const {Schema, model} = require('mongoose')

const userCollection = 'users';
const userSchema = new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

module.exports = model(userCollection, userSchema)