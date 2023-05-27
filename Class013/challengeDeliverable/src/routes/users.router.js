import { Router } from "express";
import UserManager from "../dao/managers/user.manager.js";
import CartModel from "../dao/models/cart.model.js";

const router = Router();
const userManager = new UserManager();
const cartModel = new CartModel();

router.get("/", async (req, res) => {
  let users = await userManager.getAll();
  if (!users)
    return res
      .status(500)
      .send({ status: "error", error: "No pude traer informacion" });
  res.send({ status: "success", payload: users });
});

router.post("/", async (req, res) => {
  const { first_name, last_name, email, age } = req.body;
  let result = await userManager.saveUser({
    first_name,
    last_name,
    email,
    age,
  });
  res.send({ status: "success", payload: result });
});

router.post("/:uid/carts/:cid", async (req, res) => {
  const { uid, cid } = req.params;
  const cart = await cartsManager.getById(cid);
  if (!cart)
    return res.status(404).send({ status: "error", error: "Cart not found" });
  const user = await userManager.getById({ _id: uid });
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  let cartExist = user.cart.some((c) => c._id.toString() === cid);
  if (!cartExist)
    return res
      .status(404)
      .send({ status: "error", error: "User not found in this cart" });
  user.cart.push(cart._id);
  cart.user.push(user._id);
  await userManager.updateUser(uid, user);
  await cartModel.updateCart(cid, cart);
  res.send({ status: "success", message: "user add to cart" });
});

export default router;
