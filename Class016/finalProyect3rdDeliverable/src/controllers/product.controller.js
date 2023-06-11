import ProductManager from "../dao/mongo/product.mongo.js";

const productManager = new ProductManager();

const createProduct = async (req, res) => {
  const { title, description, price, code, quantity, category, thumbnail } =
    req.body;
  let newProduct = {
    title,
    description,
    price,
    code,
    quantity,
    category,
    thumbnail,
  };
  const result = await productManager.saveProduct(newProduct);
  res.send({ status: "success", payload: result });
};

const getProducts = async (req, res) => {
  let products = await productManager.getAll();
  res.send({ status: "success", payload: products });
};

const getProductById = async (req, res) => {
  let id = req.params.pid;
  let product = await productManager.getOne(id);
  res.send({ status: "success", payload: product });
};

const updateProduct = async (req, res) => {
  let id = req.params.pid;
  const { title, description, price, code, quantity, category, thumbnail } =
    req.body;
  let updateProduct = {
    title,
    description,
    price,
    code,
    quantity,
    category,
    thumbnail,
  };
  let result = await productManager.updateProduct(id, updateProduct);
  res.send({ status: "success", payload: result });
};

const deleteProduct = async (req, res) => {
  let id = req.params.pid;
  let result = await productManager.deleteProduct(id);
  res.send({ status: "success", payload: result });
};

const saveProduct = async (req, res) => {
  const { title, description, price, code, quantity, category, thumbnail } =
    req.body;
  let newProduct = {
    title,
    description,
    price,
    code,
    quantity,
    category,
    thumbnail,
  };
  const result = await productManager.saveProduct(newProduct);
  res.send({ status: "success", payload: result });
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  saveProduct,
};
