import passport from "passport";
import LocalStrategy from "passport-local";
import logger from "../utils/logger.js";
import sendEmail from "../config/nmailer.config.js";
import userModel from "../dao/mongo/user.mongo.js";
import { createHash, isValidPassword } from "../config/dirname.js";

const loggerArchiveError = logger.getLogger(`errorArchive`);

const deserializeUser = () => {
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (err) {
      loggerArchiveError.error(err);
      done(err);
    }
  });
};

const login = () => {
  passport.use(
    "login",
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ username });
          if (!user) {
            return done(null, false);
          }
          if (!isValidPassword(user.password, password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          loggerArchiveError.error(err);
          done(err);
        }
      }
    )
  );
};

const serializeUser = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
};

const signup = () => {
  passport.use(
    "signup",
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ username });
          if (user) {
            return done(null, false);
          }
          const newUser = new userModel();
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = req.body.email;
          newUser.telefono = req.body.tel;
          newUser.edad = req.body.edad;
          newUser.direccion = req.body.direccion;
          newUser.foto = req.file.filename;
          newUser.carrito = [];
          newUser.admin = false;
          const mailOptions = {
            from: process.env.EMAIL,
            to: `nec2solutions@gmail.com`,
            subject: `Nuevo registro`,
            html: `
                    <h3>Nuevo registro de usuario!</h3>
                    <p> Datos:</p>
                    <ul>
                    <li> Nombre: ${newUser.username}</li>
                    <li> Email: ${newUser.email}</li>
                    <li> Teléfono: ${newUser.telefono}</li>
                    <li> Edad: ${newUser.edad}</li>
                    <li> Direccion: ${newUser.direccion}</li>
                    </ul>
                `,
          };
          const userSave = await newUser.save();
          const email = await sendEmail(mailOptions);
          return done(null, userSave);
        } catch (err) {
          loggerArchiveError.error(err);
          done(err);
        }
      }
    )
  );
};

export default {
  deserializeUser,
  login,
  serializeUser,
  signup,
};
