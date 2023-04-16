import productsModel from "../models/products.model.js";
export default class Products {
    constructor() {
        console.log("Working in mongoDB with Products");
    }

    getAll = async () => {
        let products = await productsModel.find().lean();
        return products;
    }

    saveProduct = async (product) => {
        let result = await productsModel.create(product);
        return result;
    }

    updateProduct = async (id,update) => {
        let result = await productsModel.findByIdAndUpdate(id,update)
        return result;
    }

    deleteProduct = async (id) => {
        let result = await productsModel.findByIdAndDelete(id)
        return result;
    }
}