import passport from "passport";
import local from "passport-local";
import UserCart from "../dao/mongo/cart.mongo.js";
import UserManager from "../dao/mongo/user.mongo.js";
import userModel from "../dao/mongo/user.mongo.js";
import { createHash, isValidPassword } from "../utils/dirname.js";

const localStrategy = local.Strategy;
const userManager = new UserManager();
const cartManager = new UserCart();
const initializePassport = async () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email", session: false },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, email, age } = req.body;
          if (!first_name || !last_name || !password)
            return done(null, false, { message: "Incomplete values" });
          const exists = await userManager.getById({ email: email });
          if (exists)
            return done(null, false, { message: "User already exists" });
          const hashedPassword = await createHash(password);
          let newCart = await cartManager.saveCart();
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            cart: newCart._id.toString(),
          };
          let result = await userManager.saveUser(newUser);
          cartManager.updateCart(newCart._id, { user: result._id.toString() });
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      { usernameField: "email", session: false },
      async (email, password, done) => {
        try {
          const user = await userManager.getById({ email });
          if (!user) return done(null, false, { message: "User not found" });
          const passwordValidate = await isValidPassword(user, password);

          if (!passwordValidate)
            return done(null, false, { message: "Incorrect password" });
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let result = await userModel.findOne({ _id: id });
    return done(null, result);
  });
};

export default initializePassport;
