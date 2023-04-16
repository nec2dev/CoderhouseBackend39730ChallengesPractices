import mongoose from "mongoose";

const usersCollection = 'users';
const usersSchema = new mongoose.Schema({
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
const usersModel = mongoose.model(usersCollection , usersSchema);

export default usersModel;