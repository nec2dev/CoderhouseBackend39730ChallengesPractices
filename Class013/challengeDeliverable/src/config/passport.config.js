import passport from "passport";
import local from "passport-local";
import userManager from "../dao/managers/user.manager.js";
import userService from "passport-github2";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import UserManager from "../dao/managers/user.manager.js";

const localStrategy = local.Strategy;
const userManager = new userManager();
const initPassport = async () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }
          const result = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            rol: "user",
          };
          let newUser = await userModel.create(result);
          return done(null, newUser);
        } catch (error) {
          return done("Error getting user" + error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
  passport.use(
    "login",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            console.log("user does not exist");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done("Error getting user" + error);
        }
      }
    )
  );
  passport.use(
    "github",
    new userService(
      {
        clientID: "Iv1.2e981da9706cb337",
        clientSecret: "67f60e47fd57130e2fd0c6a9d3043a140721d3c6",
        callbackURL: "http://localhost:8080/api/session/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          let user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "Doe",
              age: 18,
              email: profile._json.login + "@gmail.com",
              password: "123456",
            };
            let result = await userModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initPassport;
