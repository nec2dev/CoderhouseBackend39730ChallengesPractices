import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

class CartRouter {
  constructor() {
    this.router = Router();
    this.router.post("/", CartController.addCart);
    this.router.get("/:cartId", CartController.getCartById);
    this.router.post(
      "/:cartId/products/:productId",
      CartController.addProductToCart
    );
    this.router.delete(
      "/:cartId/products/:productId",
      CartController.deleteProductFromCart
    );
    this.router.put("/:cartId", CartController.replaceProductsInCart);
    this.router.put(
      "/:cartId/products/:productId",
      CartController.updateProductInCart
    );
    this.router.delete("/:cartId", CartController.emptyCart);
    this.router.post("/:cartId/purchase", CartController.completePurchase);
  }

  getRouter() {
    return this.router;
  }
}

export default new CartRouter();
