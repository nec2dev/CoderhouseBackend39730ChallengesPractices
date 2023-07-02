import mongoose from "mongoose";

const cartCollection = "carts";
const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: String,
          ref: "products",
          require: true,
        },
        quantity: {
          type: Number || 1,
          require: true,
        },
      },
    ],
    default: [],
    require: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    default: null,
  },
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
