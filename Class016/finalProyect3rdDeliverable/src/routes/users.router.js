import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.post("/:uid/carts/:cid", userController.addUserToCart);

export default router;
