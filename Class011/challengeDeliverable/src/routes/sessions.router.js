import { Router } from "express";
import passport from "passport";
import userModel from "../dao/models/user.model.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "failregister" }),
  async (req, res) => {
    return res.send({ status: "success", message: "User registered" });
  }
);

router.get("/failregister", async (req, res) => {
  console.log("registration failed");
  res.send({ status: 500, error: "registration failed" });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    const { email, password } = req.body;
    if (email == "adminCoder@coder.com" && password == "adminCod3r123") {
      req.session.user = {
        id: "adminCoder",
        first_name: "Coder",
        last_name: "Admin",
        email: email,
        rol: "admin",
      };
      return res.send({ status: "success", message: "logueado" });
    }
    if (!email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Some values are incompletes" });
    const user = await userModel.findOne({ email, password });
    if (!user)
      return res
        .status(400)
        .send({ status: "error", error: "email or password invalid" });
    req.session.user = {
      id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      rol: user.rol,
    };
    res.send({ status: "success", message: "logueado" });
  }
);

router.get("/faillogin", async (req, res) => {
  console.log("Login failed");
  res.status(500).send({ error: "Login failed" });
});

router.get(
  "/github",
  passport.authenticate(
    "github",
    { scope: ["user:email"] },
    async (req, res) => {}
  )
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    (req.session.user = req.user), res.redirect("/");
  }
);

export default router;
