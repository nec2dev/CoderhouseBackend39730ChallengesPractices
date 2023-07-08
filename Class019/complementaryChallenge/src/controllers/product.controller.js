import DAO from '../persistence/DAOs/factory.js';

const productManager = DAO.products;
class ProductController {
    getProducts = async (req, res) => {
        try {
            const results = await productManager.getProducts(req.query);
            if (results) {
                res.json({ message: 'Products found.', results })
            } else {
                res.json({ message: 'There are no products available.' })
            }
        } catch (error) {     
            res.status(500).json({ message: error.message })
        }
    }

    getMockingProducts = async (req, res) => {
        try {   
            const mockingProducts = await productManager.getMockingProducts();
            if (mockingProducts) {
                res.json({ message: 'Fake products.', results: mockingProducts })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getProductById = async (req, res) => { 
        try {
            const { productId } = req.params;
            const productFound = await productManager.getProductById(productId);
            if (productFound) {
                res.json({ message: 'Product found.', product: productFound })
            } else {
                res.json({ message: 'Product not found.' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    addProduct = async (req, res) => { 
        try {
            const newProduct = req.body;
            const addedProduct = await productManager.addProduct(newProduct);
            if (addedProduct) {
                res.json({ message: 'Product added successfully.', product: addedProduct })
            } else {
                res.json({ message: 'The product could not be added.' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { productId } = req.params;
            const newValuesObject = req.body;
            const updatedProduct = await productManager.updateProduct(productId, newValuesObject);
            if (updatedProduct) {
                res.json({ message: 'The product has been successfully updated.', product: updatedProduct })
            } else {
                res.json({ message: 'The product could not be updated.' })  
            }    
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    deleteProduct =  async (req, res) => {
        try {
            const { productId } = req.params;
            const deletedProduct = await productManager.deleteProduct(productId);
            if (deletedProduct) {
                res.json({ message: 'The product has been successfully removed.', product: deletedProduct })
            } else {
                res.json({ message: 'The product could not be deleted.' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new ProductController();