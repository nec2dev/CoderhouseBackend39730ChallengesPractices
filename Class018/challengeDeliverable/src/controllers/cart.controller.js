import DAO from "../persistence/DAOs/factory.js";

const cartManager = DAO.carts;
class CartController {
  addCart = async (req, res) => {
    try {
      const addedCart = await cartManager.addCart();
      res.json({
        message: `The cart has been successfully created with the ID ${addedCart._id}.`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (req, res) => {
    try {
      const { cartId } = req.params;
      const cart = await cartManager.getProductsFromCart(cartId);
      if (cart) {
        res.json({ message: "Cart found.", cart: cart });
      } else {
        res.json({ message: "Cart not found." });
      }
    } catch (error) {
      console.log(error);
    }
  };

  addProductToCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const addedProduct = await cartManager.addProductToCart(
        cartId,
        productId
      );
      if (addedProduct) {
        res.json({
          message: "The product has been added to the cart successfully.",
          product: addedProduct,
        });
      } else {
        res.json({
          message: "The product could not be added to the cart.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteProductFromCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const cart = await cartManager.deleteProductInCart(cartId, productId);
      if (cart) {
        res.json({
          message: "The product has been removed from the cart successfully.",
          cart: cart,
        });
      } else {
        res.json({
          message: "The product could not be removed from the cart.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  replaceProductsInCart = async (req, res) => {
    try {
      const { cartId } = req.params;
      const products = req.body;
      const cart = await cartManager.replaceProductsInCart(cartId, products);
      if (cart) {
        res.json({
          message: "Cart products have been updated successfully.",
          cart: cart,
        });
      } else {
        res.json({
          message: "The cart products could not be updated.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateProductInCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;
      const cart = await cartManager.updateProductInCart(
        cartId,
        productId,
        quantity
      );
      if (cart) {
        res.json({
          message:
            "The quantity of the product in the cart has been updated successfully.",
          cart: cart,
        });
      } else {
        res.json({
          message:
            "The quantity of the product in the cart could not be updated.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  emptyCart = async (req, res) => {
    try {
      const { cartId } = req.params;
      const cart = await cartManager.emptyCart(cartId);
      if (cart) {
        res.json({
          message: "The cart has been emptied successfully.",
          cart: cart,
        });
      } else {
        res.json({ message: "The cart could not be emptied." });
      }
    } catch (error) {
      console.log(error);
    }
  };

  completePurchase = async (req, res) => {
    try {
      const { cartId } = req.params;
      const user = req.user;
      const result = await cartManager.completePurchase(cartId, user.fullName);
      if (result) {
        res.json({ message: result });
      } else {
        res.json({ message: "The purchase could not be completed." });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default new CartController();
