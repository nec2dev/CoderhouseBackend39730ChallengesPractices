import productModel from '../models/product.model.js'

export default class ProductManager {
    constructor() {
        console.log("Working in mongoDB with Products")
    }

    getAll = async () => {
        let products = await productModel.find().lean();
        return products;
    }

    getProduct = async () => {
        let products = await productModel.find().lean()
        return products
    }

    getProductById = async (id) => {
        let result = await productModel.findById(id)
        return result
    }

    saveProduct = async (product) => {
        let result = await productModel.create(product)
        return result
    }

    updateProduct = async (id,update) => {
        let result = await productModel.findByIdAndUpdate(id,update)
        return result
    }

    deleteProduct = async (id) => {
        let result = await productModel.findByIdAndDelete(id)
        return result
    }
}
