import fs from 'fs';

class ProductManager {
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

    getProducts = async () => {
        try {
            const objs = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(objs);
        } 
        catch (err) {
            if (err.message.includes('no such file or directory')) return [];
            else console.log(err.message);
        }
    }

    addProduct = async (product) => {
        const db = await this.getProducts();
        try {
            if (db.length === 0) {
                let newId = 1;
                const newProduct = { ...product, id: newId };
                db.push(newProduct);
            }
            else {
                let newId = Math.max(...db.map(product => product.id)) + 1;
                const newProduct = { ...product, id: newId };
                db.push(newProduct);
            }
            await this.writeFile(db);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        try {
            const product = products.find(product => product.id === id);
            return product ? product : { error: "The Product does not exist" };
        }
        catch (err) {
            console.log(err.message);
        }
    }

    updateProduct = async (id, product) => {
        const products = await this.getProducts();
        const newProduct = product
        try {
            const updateProducts = products.map((product) => {
                if (product.id === id) {
                    return { ...product, ...newProduct };
                }
                else {
                    return { ...product }
                }
            });
            await this.writeFile(updateProducts);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    deleteProduct = async (id) => {
        let products = await this.getProducts();
        try {
            products = products.filter(product => product.id != id);
            await this.writeFile(products);
            return products;
        }
        catch (err) {
            console.log(err.message);
        }
    }
}

export default ProductManager;

