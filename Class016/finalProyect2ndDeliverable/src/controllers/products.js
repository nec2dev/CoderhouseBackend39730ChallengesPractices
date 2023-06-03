import ProductManager from "../dao/managers/product.manager.js";

const productManager = new ProductManager();

const getAll = async (req, res) => {
  let products = await productManager.getAll();
  console.log(products);
  res.send({ status: "success", payload: products });
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

export default {
  getAll,
  saveProduct,
  updateProduct,
  deleteProduct,
};
