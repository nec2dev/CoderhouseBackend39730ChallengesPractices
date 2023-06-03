import express from "express";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import Messages from "./dao/managers/message.manager.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionsRouter from "./routes/sessions.router.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log("Server activated on port: " + PORT)
);
const io = new Server(server);
const messagesManager = new Messages();
const connection = mongoose.connect(
  "mongodb+srv://nahuelezequielcorrea:zzmXziFAu9UoBl5C@cluster0.lq5rpf5.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

initializePassport();

mongoose.set("strictQuery", true);
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(passport.session({ secret: "secretCoder" }));
app.use(passport.initialize());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://nahuelezequielcorrea:zzmXziFAu9UoBl5C@cluster0.lq5rpf5.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 20,
    }),
    secret: "secretCode",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/", viewsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/carts/:cid", cartsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/products", productsRouter);
app.use("/api/products/:pid", productsRouter);
app.use("/api/session", sessionsRouter);

io.on("connection", (socket) => {
  console.log("We have a client connected");
  socket.on("authenticated", (data) => {
    console.log(`username ${data} received`);
    socket.broadcast.emit("newUserConnected", data);
  });
  socket.on("message", async (data) => {
    console.log(data);
    await messagesManager.createMessage({
      user: data.user,
      message: data.message,
    });
    const logs = await messagesManager.getMessages();
    io.emit("log", { logs });
  });
});
