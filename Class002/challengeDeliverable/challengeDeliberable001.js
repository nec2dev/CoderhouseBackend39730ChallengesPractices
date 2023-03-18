//DESAFÍO ENTREGABLE
/*Clases con ECMAScript y ECMAScript avanzado*/
/*1. Crear una clase llamada Persona que siga las siguientes condiciones:
    /*
    ✓ Consigna:
    Realizar una clase “ProductManager” que gestione un conjunto de productos.
    Aspectos a incluir:
    ✓ Debe crearse desde su constructor con el elemento products, el cual será 
    un arreglo vacío.
    ✓ Cada producto que gestione debe contar con las propiedades:
    - title (nombre del producto)
    - description (descripción del producto)
    - price (precio)
    - thumbnail (ruta de imagen)
    - code (código identificador)
    - stock (número de piezas disponibles)
    **/
class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    /*
    ✓ Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
    - Validar que no se repita el campo “code” y que todos los campos sean obligatorios
    - Al agregarlo, debe crearse con un id autoincrementable
    - stock (número de piezas disponibles)
    **/
    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.find(product => product.code !== code) || this.products.length === 0) {
            if (title && description && price && thumbnail && code && stock) {
                const product = {
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    id: this.id
                };
                this.id++;
                this.products.push(product);
            }
            else {
                console.log("Error: Missing fill in fields");
            }
        }
        else {
            console.log("Error: The code field has been repeated");
        }
    }

    /*
    ✓ Debe contar con un método “getProducts” el cual debe devolver el arreglo 
    con todos los productos creados hasta ese momento
    **/
    getProducts() {
        console.log(this.products);
    }

    /*
    ✓ Debe contar con un método “getProductById” el cual debe buscar en el 
    arreglo el producto que coincida con el id
    - En caso de no coincidir ningún id, mostrar en consola un error “Not found”
    **/
    getProductById(id) {
        if (this.products.find(product => product.id === id)) {
            let resultado = this.products.filter(product => product.id === id);
            console.log(resultado);
        }
        else {
            console.log("Not found");
        }
    }
}

let productos = new ProductManager();

productos.getProducts();
productos.addProduct("TestItem001", "This is a description for the item 001", 256000.00, "./img/001Image.png", "A1001", 256);
productos.addProduct("TestItem002", "This is a description for the item 002", 512000.00, "./img/002Image.png", "A1002", 512);
productos.getProducts();
productos.addProduct("TestItem003", "This is a description for the item 003", 1024000.00, "./img/003Image.png", "A1003", 1024);
productos.addProduct("TestItem004", "This is a description for the item 004", 2048000.00, "./img/004Image.png", "A1004", 2048);
productos.addProduct("TestItem005", "This is a description for the item 005", 4096000.00, "./img/005Image.png", "A1005", 4096);
productos.getProductById(0);
productos.getProductById(4);
productos.getProductById(261);