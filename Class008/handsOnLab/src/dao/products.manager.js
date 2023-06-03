const Product = require("../model/product.model");
const productManager = require("../dao/products.manager");
const productModel = require("../model/product.model");

class ProductManager {
  constructor() {
    this.products = [];
  }

  async addProduct(product) {
    return await productModel.create(product);
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProduct(pid) {
    return this.products.find((product) => product.id === pid);
  }

  removeProduct(pid) {
    this.products = this.products.filter((product) => product.id !== pid);
  }

  updateProduct(product) {
    const index = this.products.findIndex((p) => p.id === product.id);
    this.products[index] = product;
  }
}

module.exports = ProductManager;
