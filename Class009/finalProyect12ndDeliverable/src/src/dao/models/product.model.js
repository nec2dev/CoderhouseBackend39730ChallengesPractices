import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = 'products';
const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true,
        unique: true
    },
    stock:{
        type:Number,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    status: {
        type: Boolean,
        default: true
    }
})
productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection , productSchema);

export default productModel;