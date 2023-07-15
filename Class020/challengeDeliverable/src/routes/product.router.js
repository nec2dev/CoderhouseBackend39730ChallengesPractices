import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';

class ProductRouter {
    constructor() {
        this.router = Router();
        this.router.get('/', ProductController.getProducts);
        this.router.get('/mockingProducts', ProductController.getMockingProducts);
        this.router.get('/:productId', ProductController.getProductById);
        this.router.post('/', ProductController.addProduct);
        this.router.put('/:productId', ProductController.updateProduct);
        this.router.delete('/:productId', ProductController.deleteProduct);
    }

    getRouter() {
        return this.router;
    }
}

export default new ProductRouter();