const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  
  res.send("GET /api/usuario");
});

router.get("/:uid", (req, res) => {
  res.send("GET /api/usuario/:id");
});

router.post("/", (req, res) => {
  res.send("POST /api/usuario");
});

router.put("/:uid", (req, res) => {
  res.send("PUT /api/usuario/:id");
});

router.delete("/:uid", (req, res) => {
  res.send("DELETE /api/usuario/:id");
});

module.exports = router;
