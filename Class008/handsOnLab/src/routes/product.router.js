const { Router } = require("express");
const productManager = require("../dao/products.manager");
const router = Router();

router.get("/", async (req, res) => {
  const resp = await productManager.getProducts();
  res.send(resp);
});

router.get("/:pid", (req, res) => {
  res.send("GET /api/producto/:id");
});

router.post("/", async (req, res) => {
  const product = req.body;
  const resp = await productManager.addProduct(product);
  res.send(resp);
});

router.put("/:pid", (req, res) => {
  res.send("PUT /api/producto/:id");
});

router.delete("/:pid", (req, res) => {
  res.send("DELETE /api/producto/:id");
});

module.exports = router;
