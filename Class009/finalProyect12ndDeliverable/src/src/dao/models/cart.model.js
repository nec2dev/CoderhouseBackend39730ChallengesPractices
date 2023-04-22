import mongoose from "mongoose";

const cartCollection = 'carts';
const cartSchema = new mongoose.Schema({
    products:{
        type: [
            {
                product:{
                    type:String,
                    ref:"products",
                    required: true,
                },
                quantity: {
                    type: Number || 1,
                    required:true,
                }
            }
        ],
        default: [],
        required: true
    }
})
const cartModel = mongoose.model(cartCollection , cartSchema);

export default cartModel;