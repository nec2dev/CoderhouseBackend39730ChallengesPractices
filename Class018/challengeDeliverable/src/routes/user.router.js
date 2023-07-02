import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

class UserRouter {
  constructor() {
    this.router = Router();
    this.router.post(
      "/register",
      passport.authenticate("register", {
        failureRedirect: "/views/errorRegister",
        successRedirect: "/views/login",
        passReqToCallback: true,
      })
    );
    this.router.post(
      "/login",
      passport.authenticate("login", {
        failureRedirect: "/views/errorLogin",
        successRedirect: "/views/products",
        passReqToCallback: true,
      })
    );
    this.router.get("/logout", UserController.logout);
    this.router.get(
      "/authGithub",
      passport.authenticate("github", { scope: ["user:email"] })
    );
    this.router.get(
      "/github",
      passport.authenticate("github"),
      UserController.githubLoginPassport
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRouter();
