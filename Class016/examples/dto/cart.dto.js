class CartDTO {
  constructor(cart) {
    (this.products = cart.products), (this.user = cart.user);
  }
}

module.exports = CartDTO;
