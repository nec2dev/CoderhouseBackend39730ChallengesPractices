const fs = require('fs');
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
            return product ? product : null;
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
        }
        catch (err) {
            console.log(err.message);
        }
    }
}

let productos = new ProductManager('Class003/challengeDeliverable/productos.txt');

const test = async () => {
    console.log(await productos.getProducts());
    const producto001 = {
        title: "TestItem001",
        description: "This is a description for the item 001",
        price: 4096000.00,
        thumbnail: "./img/001Image.png",
        code: "A1001",
        stock: 4096
    };
    
    await productos.addProduct(producto001);
    console.log(await productos.getProducts());

    const producto002 = {
        title: "TestItem002",
        description: "This is a description for the item 002",
        price: 2048000.00,
        thumbnail: "./img/002Image.png",
        code: "A1002",
        stock: 2048
    };

    await productos.addProduct(producto002);
    console.log(await productos.getProducts());
    console.log(await productos.getProductById(1));

    const productoActualizado = {
        title: "TestItem005",
        description: "This is a description for the item 005",
        price: 1024000.00,
        thumbnail: "./img/005Image.png",
        code: "A1005",
        stock: 1024
    };

    await productos.updateProduct(1, productoActualizado);
    console.log(await productos.getProducts());

    await productos.deleteProduct(1);
    console.log(await productos.getProducts());
}

test();