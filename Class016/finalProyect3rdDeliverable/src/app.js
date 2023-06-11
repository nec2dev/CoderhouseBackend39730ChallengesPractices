import express from "express";
import __dirname from "./utils/dirname.js";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionsRouter from "./routes/sessions.router.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import config from "./config/db.js";
import initializePassport from "./config/passport.config.js";

const app = express();
const PORT = config.port;
const server = app.listen(PORT, console.log(`Server working in port: ${PORT}`));
initializePassport();
mongoose.set("strictQuery", true);
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: config.cookieSecret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session({ secret: "secretCoder" }));
app.use(passport.initialize());
app.use("/", viewsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/carts/:cid", cartsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/products", productsRouter);
app.use("/api/products/:pid", productsRouter);
app.use("/api/session", sessionsRouter);
app.use("/api/users", usersRouter);
