import express from "express";

const app = express();
const PORT = 3000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
app.use("/static", express.static(__dirname + "/public"));
