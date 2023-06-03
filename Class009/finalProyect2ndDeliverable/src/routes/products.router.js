import { Router } from "express";
import ProductManager from "../dao/managers/product.manager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const limit = req.query.limit;
    const productsLimited = products.slice(0, limit);
    if (!products) {
      return res.status(404).send({
        status: "error",
        message: { error: "No products found" },
      });
    }
    if (!limit) {
      return res.status(200).send({
        status: "success",
        message: { products: products },
      });
    }
    if (isNaN(limit)) {
      return res.status(400).send({
        status: "error",
        message: { error: `invalid value "Limit : ${limit}".` },
      });
    }
    return res.status(200).send({
      status: "success",
      message: { products: productsLimited },
    });
  } catch(error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  let product = await productManager.getProductById(id);
  console.log(product);
  res.send({ status: "success", payload: product });
});

router.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock, category } =
    req.body;
  let newProduct = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  };

  const result = await productManager.createProduct(newProduct);
  res.send({ status: "success", payload: result });
});

router.put("/:pid", async (req, res) => {
  let id = req.params.pid;
  const { title, description, price, thumbnail, code, stock, category } =
    req.body;
  let updateProduct = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  };
  let result = await productManager.updateProduct(id, updateProduct);
  res.send({ status: "success", payload: result });
});

router.delete("/:pid", async (req, res) => {
  let id = req.params.pid;
  let result = await productManager.deleteProduct(id);
  res.send({ status: "success", payload: result });
});

export default router;
