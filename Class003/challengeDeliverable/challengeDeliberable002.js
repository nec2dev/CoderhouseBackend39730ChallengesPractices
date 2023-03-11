//DESAFÍO ENTREGABLE
/*Manejo de archivos*/
/*
✓ Consigna:
Realizar una clase de nombre “ProductManager”, el cual permitirá 
trabajar con múltiples productos. Éste debe poder agregar, consul-
tar, modificar y eliminar un producto y manejarlo en persistencia 
de archivos (basado en entregable 1).
Aspectos a incluir:
**/
const fs = require('fs');

class ProductManager {
    /*
    ✓ La clase debe contar con una variable this.path, el cual se inicializará 
    desde el constructor y debe recibir la ruta a trabajar desde el momento de 
    generar su instancia.
    **/
    constructor(path) {
        this.path = path;
    }

    /* 
    ✓ Metodo writeFile para escribir en el archivo 
    **/
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

    /*
    ✓ Debe tener un método getProducts, el cual debe leer el archivo de productos 
    y devolver todos los productos en formato de arreglo.
    **/
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

    /*
    ✓ Debe tener un método addProduct el cual debe recibir un objeto con el formato 
    previamente especificado, asignarle un id autoincrementable y guardarlo en el 
    arreglo (recuerda siempre guardarlo como un array en el archivo).
    **/
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

    /*
    ✓ Debe tener un método getProductById, el cual debe recibir un id, 
    y tras leer el archivo, debe buscar el producto con el id especificado 
    y devolverlo en formato objeto
    **/
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

    /*
    ✓ Debe tener un método updateProduct, el cual debe recibir el id del producto 
    a actualizar, así también como el campo a actualizar (puede ser el objeto 
    completo, como en una DB), y debe actualizar el producto que tenga ese 
    id en el archivo. 
    NO DEBE BORRARSE SU ID
    **/
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

    /*
    ✓ Debe tener un método deleteProduct, el cual debe recibir un id 
    y debe eliminar el producto que tenga ese id en el archivo.
    **/
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

/*
✓ Se crea una instancia de la clase ProductManager,
y luego se aplican los métodos de clase anteriormente creados.
**/
let productos = new ProductManager('Class003/challengeDeliverable/productos.txt');

const test = async () => {
    /*
    ✓ Se llamará al método “getProducts” y se mostrará por consola 
    el resultado.
    Se espera que el archivo este vacío, por lo que se mostrará un
    arreglo vacío.
    **/
    console.log(await productos.getProducts());

    /* 
    Se creara un objeto producto001 con el formato especificado
    y se agregara al archivo de productos, luego se mostrara por consola 
    el resultado mediante el metodo getProducts().
    **/
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

    /*
    Ahora, se creara el objeto producto002 con el formato especificado
    y se agregara al archivo de productos, luego se mostraran por consola
    los 2 productos mediante el metodo getProducts().
    **/
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

    /*
    ✓ Se llamará al método “getProductById” y se mostrará por consola
    el resultado. Se espera que se muestre el producto con id 1.
    Si el id no existe, se mostrará un mensaje de error.
    **/
    console.log(await productos.getProductById(1));

    /*
    ✓ Se invoca al método “updateProduct” para actualizar el producto con id 1,
    se espera que se actualice el producto con id 1, y que se muestre por consola
    el resultado.
    **/
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

    /*
    ✓ Se invoca al método “deleteProduct” para eliminar el producto con id 1,
    se espera que se elimine el producto con id 1, y que se muestre por consola
    el resultado.
    **/
    await productos.deleteProduct(1);
    console.log(await productos.getProducts());
}

test();