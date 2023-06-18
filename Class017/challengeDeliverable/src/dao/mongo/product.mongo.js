import productModel from "../../models/product.model.js";

export default class Product{
  constructor() {
    console.log("Working in mongoDB with Products");
  }

  createProduct = async (product) => {
    let result = await productModel.create(product);
    return result;
  };

  getProducts = async () => {
    let products = await productModel.find().lean();
    return products;
  };

  getProductById = async (_id) => {
    try {
      const product = productModel.findById(_id);
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (id, update) => {
    let result = await productModel.findByIdAndUpdate(id, update);
    return result;
  };

  deleteProduct = async (id) => {
    let result = await productModel.findByIdAndDelete(id);
    return result;
  };
}
