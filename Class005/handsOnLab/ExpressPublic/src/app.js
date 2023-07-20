import express from "express";
import cookieParser from "cookie-parser";
import petRouter from "./routes/petRouter.js";
import viewRouter from "./routes/viewRouter.js";
import handlebars from "express-handlebars";

const app = express();
const PORT = 3000;
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use("/pets", petRouter);
app.use("/views/users", viewRouter);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
