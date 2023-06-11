import mongoStrore from "connect-mongo";
import session from "express-session";
import log4js from "../utils/logger.js";

const loggerConsole = log4js.getLogger(`default`);
const loggerArchiveWarn = log4js.getLogger(`warnArchive`);
const loggerArchiveError = log4js.getLogger(`errorArchive`);
const session = session({
  store: mongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 10,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000 },
});

export default {
    loggerConsole,
    loggerArchiveWarn,
    loggerArchiveError,
    session,
};
