const { Schema, model } = require("mongoose");
const collection = "products";
const productSchema = new Schema({
  code: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    max: 100,
    min: 5,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  thumbnail: {
    type: String,
    required: true,
    max: 100,
    min: 5,
  },
});
const productModel = model(collection, productSchema);

module.exports = productModel;
