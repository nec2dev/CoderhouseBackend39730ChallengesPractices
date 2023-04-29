import cartModel from '../models/cart.model.js'
import productModel from '../models/product.model.js'

export default class Carts {
    constructor() {
        console.log("Working in mongoDB with Carts")
    }

    getAll = async () => {
        let carts = await cartModel.find().lean()
        return carts
    }

    getOne = async (id) => {
        let cart = await cartModel.findOne({_id: id}).lean();
        return cart;
    }

    saveCart = async () => {
        let result = await cartModel.create({
            products: []
        });
        return result
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
                }
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
            console.log(err)
        }
    }

    updateCart = async(cid, cart) => {
        let result = await cartModel.updateOne({_id: cid}, cart);
        return result;
    }

    deleteProductFromCart = async (cid, pid) => {
        let result = await cartModel.updateOne({_id: cid}, {$pull: {products: {product: pid}}});
        return result;
    }

    deleteAllProdFromCart = async (req, res) => {
        const cid = req.params.cid;
        let cart = await cartsManager.getOne(cid);
        cart.products = [];
        let result = await cartsManager.updateCart(cid, cart);
        res.send({ status: "Success", payload: result });
    }

    updateProductQuantity = async (req, res) => {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let { quantity } = req.body;
    
        let cart = await cartsManager.getOne(cid);
        let productExist = false;
        cart.products.forEach(product => {
            if (product._id == pid) {
                product.quantity = quantity;
                productExist = true
            }
        })
        if (productExist === true) {
            let result = await cartsManager.updateCart(cid, cart);
            res.send({ status: "Success", payload: result });
        } else {
            res.send({ status: 404, payload: "The product does not exist in the cart" });
        }
    }
}
