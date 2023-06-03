import UserManager from "../dao/managers/user.manager.js";
import CartManager from "../dao/managers/cart.manager.js";

const userManager = new UserManager();
const cartManager = new CartManager();

const getAll = async (req, res) => {
  let users = await userManager.getAll();
  if (!users)
    return res
      .status(500)
      .send({ status: "error", error: "Can not bring the information" });
  res.send({ status: "success", payload: users });
};

const saveUser = async (req, res) => {
  const { first_name, last_name, email, age, cart } = req.body;
  let result = await userManager.saveUser({
    first_name,
    last_name,
    email,
    age,
    cart,
  });
  res.send({ status: "success", payload: result });
};

const addUserToCart = async (req, res) => {
  const { uid, cid } = req.params;
  const cart = await cartManager.getOne(cid);
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
  await cartManager.updateCart(cid, cart);
  res.send({ status: "success", message: "User add to cart" });
};

export default {
  getAll,
  saveUser,
  addUserToCart,
};
