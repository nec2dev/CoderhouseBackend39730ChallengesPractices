const { Router } = require("express");
const { uploader } = require("../util/uploader");
const router = Router();
const userRouter = require("./user.router");
const productRouter = require("./product.router");

router.use("api/usuarios", userRouter);
router.use("api/productos", productRouter);
router.post("/uploads", uploader.single("myFile"), (req, res) => {
  res.send("Archivo subido correctamente");
});

module.exports = router;
