import { Router } from "express";
import ViewController from "../controllers/view.controller.js";

class ViewRouter {
  constructor() {
    this.router = Router();
    this.router.get("/", ViewController.renderProducts);
    this.router.get("/realTimeProducts", ViewController.getRealTimeProducts);
    this.router.get("/products", ViewController.getProductsForUser);
    this.router.get("/carts/:cartId", ViewController.getCart);
    this.router.get("/login", ViewController.renderLogin);
    this.router.get("/register", ViewController.renderRegister);
    this.router.get("/errorRegister", ViewController.renderErrorRegister);
    this.router.get("/errorLogin", ViewController.renderErrorLogin);
  }
  getRouter() {
    return this.router;
  }
}

export default new ViewRouter();
