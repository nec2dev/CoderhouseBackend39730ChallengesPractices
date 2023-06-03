import mongoose from "mongoose";

const cartCollection = "carts";
const cartSchema = mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    default: null,
  },
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
