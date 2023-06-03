import { Router } from "express"
import cartController from "../controllers/cart.controller.js"

const router = Router()

router.post("/", cartController.getCarts)
router.get("/", cartController.createCart)
router.get("/:cid", cartController.getCartById) 
router.delete("/:cid", cartController.deleteCart)
router.post("/:cid/product/:pid", cartController.addProductToCart)
router.delete("/:cid/products/:pid", cartController.deleteProdFromCart)
router.put("/:cid", cartController.updateCart)
router.put("/:cid/product/:pid", cartController.updateProdInCart)

export default router;
