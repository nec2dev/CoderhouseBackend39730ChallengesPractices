import session from "express-session";
import mongoStore from "connect-mongo";
import config from "../config/db.config.js";
import log4js from "../utils/logger.js";
import parseArgs from "minimist";
import dotenv from "dotenv";

dotenv.config();
const loggerConsole = log4js.getLogger(`default`);
const loggerArchiveWarn = log4js.getLogger(`warnArchive`);
const loggerArchiveError = log4js.getLogger(`errorArchive`);
const args = parseArgs(process.argv.slice(2));
const CLUSTER = args.CLUSTER;
const inSession = () => {
  session({
    store: mongoStore.create({
      mongoUrl: config.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: config.cookieSecret,
    resave: false,
    saveUninitialized: false,
  });
};
const isLogged = (req, res, next) => {
  let msgError = `Para acceder a esta URL debe iniciar sesión`;
  if (req.user) {
    next();
  } else {
    return res.render("viewError", { msgError });
  }
};
const clustering = () => {
  if (CLUSTER) {
    if (CLUSTER.isMaster) {
      for (let i = 0; i < numCPUs; i++) {
        CLUSTER.fork();
      }
      CLUSTER.on(`exit`, (worker, code, signal) => {
        CLUSTER.fork();
      });
    } else {
      runServer(PORT);
    }
  } else {
    runServer(PORT);
  }
};

export default {
  loggerConsole,
  loggerArchiveWarn,
  loggerArchiveError,
  inSession,
  isLogged,
  clustering,
};
