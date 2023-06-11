import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";

import dotenv from "dotenv";
import parseArgs from "minimist";
import session from "./middlewares/middlewares.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import ticketsRouter from "./routes/tickets.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
dotenv.config();
app.use("/", express.static("./public/js/index.js"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(`/`, viewsRouter);
app.use(`/signup`, signupRouter);
app.use(`/login`, loginRouter);
app.use(`/logout`, isLogged, logoutRouter);
app.use(`/profile`, isLogged, profileRouter);
app.use(`/api/carts`, isLogged, cartsRouter);
app.use(`/api/messages`, messagesRouter);
app.use(`/api/products`, productsRouter);
app.use(`/api/session`, sessionsRouter);
app.use(`/api/tickets`, ticketsRouter);
app.use(`/api/users`, usersRouter);
