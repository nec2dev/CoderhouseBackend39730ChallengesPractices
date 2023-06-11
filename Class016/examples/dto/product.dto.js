class ProductDTO {
  constructor(product) {
    (this.id = product.id),
      (this.name = product.name),
      (this.description = product.description),
      (this.code = product.code),
      (this.price = product.price),
      (this.stock = product.stock),
      (this.thumbnail = product.thumbnail),
      (this.timestamp = product.timestamp);
  }
}

module.exports = ProductDTO;
