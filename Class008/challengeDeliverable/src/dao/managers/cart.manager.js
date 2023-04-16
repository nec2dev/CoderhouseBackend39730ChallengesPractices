import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
export default class Carts {
    constructor() {
        console.log("Working in mongoDB with carts");
    }

    getAll = async () => {
        let carts = await cartModel.find().lean();
        return carts;
    }

    saveCart = async () => {
        let result = await cartModel.create({
            products: []
        });
        return result;
    }

    deleteCart = async (id) => {
        let result = await cartModel.findByIdAndDelete(id);
        return result;
    }

    addProductToCart = async (cid, pid) => {
        try {
            const cartFound = await cartModel.findById(cid);
            if (!cartFound)
                return {
                    status: 404,
                    error: `Cart with id ${cid} not found`,
                };
            const productFound = await productModel.findById(pid);
            if (!productFound)
                return {
                    status: 404,
                    error: `Product with id ${pid} not found`,
                };
            let productIndex = cartFound.products.findIndex(p => p.product === pid)
            if (productIndex != -1) {
                let updateProducts = cartFound;
                updateProducts.products[productIndex].quantity++
                return await cartModel.findByIdAndUpdate(cid, { products: updateProducts.products })
            }
            else {
                return await cartModel.findByIdAndUpdate(cid, { $push: { products: { product: pid, quantity: 1 } } })
            }
        } catch (err) {
            console.log(err);
        }
    }
}
