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
        if (!this.path) throw new Error('No path specified');
        try {
            const objs = await fs.promises.readFile(this.path, 'utf-8');
            if (objs === '') return [];
            else
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
    Cuando añadimos un producto cuyo código ya existe no debería añadirlo y debería 
    arrojar un error
    **/
    addProduct = async (product) => {
        const db = await this.getProducts();
        try {
            const productExists = db.find(product => product.code === product.code);
            if (db.length === 0) {
                let newId = 1;
                const newProduct = { ...product, id: newId };
                db.push(newProduct)
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

    loadProducts = async (products) => {
        try {
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

let productos = new ProductManager('Class003/challengeDeliverable/data.json');

const test00 = async () => {
    console.log(await productos.getProducts());
    console.log('------------------');
    const product006 = {
        title: "TestItem006",
        description: "This is a description for the item 006",
        price: 4096000.00,
        thumbnail: "./img/006Image.png",
        code: "A1006",
        stock: 4096
    };
    await productos.addProduct(product006);
    console.log(await productos.getProducts());
    console.log('------------------');
    console.log(await productos.getProductById(5));
    console.log('------------------');
    const product006Update = {
        title: "TestItem006Update",
        description: "This is a description for the item 006",
        price: 4096000.00,
        thumbnail: "./img/006Image.png",
        code: "A1006",
        stock: 4096
    };
    await productos.updateProduct(6, product006Update);
    console.log(await productos.getProducts());
    console.log('------------------');
    await productos.deleteProduct(7);
    console.log(await productos.getProducts());
}









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
    const product001 = {
        title: "TestItem001",
        description: "This is a description for the item 001",
        price: 4096000.00,
        thumbnail: "./img/001Image.png",
        code: "A1001",
        stock: 4096
    };
    
    await productos.addProduct(product001);
    console.log(await productos.getProducts());

    /*
    Ahora, se creara el objeto producto002 con el formato especificado
    y se agregara al archivo de productos, luego se mostraran por consola
    los 2 productos mediante el metodo getProducts().
    **/
    const product002 = {
        title: "TestItem002",
        description: "This is a description for the item 002",
        price: 2048000.00,
        thumbnail: "./img/002Image.png",
        code: "A1002",
        stock: 2048
    };

    await productos.addProduct(product002);
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
    ✓ Se aplica el método “deleteProduct” para eliminar el producto con id 1,
    se espera que se elimine el producto con id 1, y que se muestre por consola
    el resultado.
    **/
    await productos.deleteProduct(1);
    console.log(await productos.getProducts());
}

//test();
test00();


/*
Solamente me gustaría recomendarte lo siguiente:
1- Utilizar un archivo .json en lugar de .txt, para que la información quede más 
rdenada y fácil de distinguir.
2- Si en mi proyecto no tengo el archivo "products.json" y llamo al método getProducts 
no devuelve nada. Ésto es porque antes debería llamar al método writeFile, pero ahí 
está el detalle, al ejecutar dicho método sin pasarle ningún argumento no hace nada 
porque funciona solamente si recibe una "data". Para cambiare eso sólo agregué un 
condicional en el método writeFile:
await fs.promises.writeFile(this.path, JSON.stringify(data || []));
Si data es true la transforma a json, y si data es false crea el archivo "products.json"
con un array vacío.
3- Cuando añadimos un producto cuyo código ya existe no debería añadirlo y debería 
arrojar un error, pero lo añade de todas maneras. 
**/