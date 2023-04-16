import productModel from "../models/product.model.js";
export default class Products {
    constructor() {
        console.log("Working in mongoDB with Products");
    }

    getAll = async () => {
        let products = await productModel.find().lean();
        return products;
    }

    saveProduct = async (product) => {
        let result = await productModel.create(product);
        return result;
    }

    updateProduct = async (id,update) => {
        let result = await productModel.findByIdAndUpdate(id,update)
        return result;
    }

    deleteProduct = async (id) => {
        let result = await productModel.findByIdAndDelete(id)
        return result;
    }
}