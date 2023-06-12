import { Router } from 'express'
import viewController from '../controllers/view.controller.js'

const router = Router();
router.get(`/`, viewController.renderUsers);
router.get(`/products`, viewController.renderProducts);
router.get(`/product/:pid`, viewController.renderProducts);
router.get(`/carts`, viewController.renderCart);
router.get(`/carts/:cid`, viewController.renderCart);
router.get(`/messages`, viewController.renderMessages);
router.get(`/register`, viewController.renderRegister);
router.get(`/login`, viewController.renderLogin);
router.get(`/logout`, viewController.logout);

export default router;
