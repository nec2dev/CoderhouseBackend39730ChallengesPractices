import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import config from "./config/db.config.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import __dirname from "./utils/dirname.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import ticketsRouter from "./routes/tickets.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
const PORT = config.port;
const MONGO_URL = config.mongoUrl;
mongoose.set("strictQuery", false);
const server = app.listen(PORT, console.log(`Server working ar port: ${PORT}`));
const connection = mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
initializePassport();
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
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
app.use(`/`, viewsRouter);
app.use(`/api/carts`, cartsRouter);
app.use(`/api/messages`, messagesRouter);
app.use(`/api/products`, productsRouter);
app.use(`/api/tickets`, ticketsRouter);
app.use(`/api/users`, usersRouter);
