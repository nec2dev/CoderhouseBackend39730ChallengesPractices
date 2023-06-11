import UserManager from "../../../examples/dto/user.dto.js";
import CartManager from "../../../examples/repositories/cart.repository.js";

const userManager = new UserManager();
const cartManager = new CartManager();

const createUser = async (req, res) => {
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

const getUsers = async (req, res) => {
  let users = await userManager.getUsers();
  if (!users)
    return res
      .status(500)
      .send({ status: "error", error: "Can not bring the information" });
  res.send({ status: "success", payload: users });
};

const getUserById = async (req, res) => {
  let id = req.params.uid;
  let user = await userManager.getUserById(id);
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  res.send({ status: "success", payload: user });
};

const updateUser = async (req, res) => {
  let id = req.params.uid;
  const { first_name, last_name, email, age, cart } = req.body;
  let updateUser = { first_name, last_name, email, age, cart };
  let result = await userManager.updateUser(id, updateUser);
  if (!result)
    return res.status(404).send({ status: "error", error: "User not found" });
  res.send({ status: "success", payload: result });
};

const deleteUser = async (req, res) => {
  let id = req.params.uid;
  let result = await userManager.deleteUser(id);
  if (!result)
    return res.status(404).send({ status: "error", error: "User not found" });
  res.send({ status: "success", payload: result });
};

const addUserToCart = async (req, res) => {
  const { uid, cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  if (!cart)
    return res.status(404).send({ status: "error", error: "Cart not found" });
  const user = await userManager.getUserById({ _id: uid });
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
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addUserToCart,
};
