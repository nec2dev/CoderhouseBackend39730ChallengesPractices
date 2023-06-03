const express = require("express");
const app = express();
const PORT = 8080;
const router = require("./routes/index.js");
const { objConfig } = require("./config/config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/static", express.static(__dirname + "/public"));
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Servidor express escuchando en http://localhost:${PORT}`);
});
