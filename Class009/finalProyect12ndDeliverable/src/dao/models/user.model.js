import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const userCollection = 'users'
const userSchema = new mongoose.Schema({
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
userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model(userCollection , userSchema);

export default userModel;