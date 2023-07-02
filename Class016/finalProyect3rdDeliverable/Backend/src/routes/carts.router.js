import { Router } from 'express'
import cartController from '../controllers/cart.controller.js'

const router = Router();
router.post(`/`, cartController.createCart);
router.get(`/`, cartController.getCarts);
router.get(`/:cid`, cartController.getCartById);
router.put(`/:cid`, cartController.updateCart);
router.put(`/:cid/product/:pid`, cartController.updateProdInCart);
router.delete(`/:cid/products/:pid`, cartController.deleteProdFromCart);
router.delete(`/:cid`, cartController.deleteCart);
router.post(`/:cid/product/:pid`, cartController.addProductToCart);
router.put(`/:cid/product/:pid`, cartController.updateProductQuantity);

export default router;
