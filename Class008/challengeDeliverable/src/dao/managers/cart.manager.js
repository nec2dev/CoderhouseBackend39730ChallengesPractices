import cartsModel from "../models/carts.model.js";
import productsModel from "../models/products.model.js";

class CartManager {
    constructor(path) {
        this.path = path;
    }

    writeFile = async (data) => {
        try {
            await fs.promises.writeFile(
                this.path, JSON.stringify(data)
            )
        }
        catch (err) {
            console.log(err.message);
        }
    }

    getCarts = async () => {
        try {
            const objs = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(objs);
        }
        catch (err) {
            if (err.message.includes('no such file or directory')) return [];
            else console.log(err.message);
        }
    }

    addCart = async () => {
        const db = await this.getCarts();
        try {
            if (db.length === 0) {
                let newId = 1;
                const newCart = { products: [], id: newId };
                db.push(newCart);
            }
            else {
                let newId = Math.max(...db.map(product => product.id)) + 1;
                const newCart = { products: [], id: newId };
                db.push(newCart);
            }
            await this.writeFile(db);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    addProductToCart = async (cartId, productId) => {
        const carts = await this.getCarts();
        try {
            let cartIndex = carts.findIndex((cart) => cart.id === cartId);
            if(cartIndex != -1) {
                let carts = carts[cartIndex].products.findIndex((p) => p.product === productId); 
                if(productIndex != -1) {
                    carts[cartIndex].products[productIndex].quantity++
                }
                else {
                    carts[cartIndex].products.push({
                        product:productId,
                        quantity:1
                    })
                }
            }
            else{
                console.log("The cart does not exist");
            }
            await this.writeFile(carts);
        }
        catch (err) {
            console.log(err.message);
        }
    }
}

export default CartManager;