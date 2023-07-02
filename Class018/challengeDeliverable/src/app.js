import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import { Server } from "socket.io";
import { __dirname } from "./utils/utils.js";
import CartRouter from "./routes/cart.router.js";
import ProductRouter from "./routes/product.router.js";
import ViewRouter from "./routes/view.router.js";
import UserRouter from "./routes/user.router.js";
import LoggerRouter from "./routes/logger.router.js";
import "./persistence/mongo/config.mongo.js";
import passport from "passport";
import "./config/passport.js";
import config from "./config/config.js";
import { errorMiddleware } from "./middlewares/errors.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSetup } from "./config/swagger.js";
import logger from "./utils/winston.js";

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
config.PERSISTENCE === "MONGO"
  ? app.use(
      session({
        secret: "sessionKey",
        resave: false,
        saveUninitialized: true,
        store: new mongoStore({
          mongoUrl:
            "mongodb+srv://nahuelezequielcorrea:zzmXziFAu9UoBl5C@cluster0.lq5rpf5.mongodb.net/?retryWrites=true&w=majority",
        }),
      })
    )
  : null;
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/carts", CartRouter.getRouter());
app.use("/api/products", ProductRouter.getRouter());
app.use("/api/users", UserRouter.getRouter());
app.use("/views", ViewRouter.getRouter());
app.use("/api/loggerTest", LoggerRouter.getRouter());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use(errorMiddleware);

const httpServer = app.listen(config.PORT, () => {
  logger.info(`Servidor escuchando al puerto ${config.PORT}.`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  logger.info(`Usuario conectado con el ID ${socket.id}.`);
  socket.emit("fetchProducts");
  socket.on("updateProducts", () => {
    socket.emit("fetchProducts");
  });
  socket.on("disconnect", () => {
    logger.info(`Usuario con ID ${socket.id} se ha desconectado.`);
  });
});
