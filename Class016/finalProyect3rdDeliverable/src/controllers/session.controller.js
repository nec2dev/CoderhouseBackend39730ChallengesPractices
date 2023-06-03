import passport from "passport";

const register = async () => {
  passport.authenticate("register", { failureRedirect: "failregister" }),
    async (req, res) => {
      return res.send({ status: "success", message: "Registered user" });
    };
};

const failRegister = async (req, res) => {
  console.log("Registration failed");
  res.send({ status: 500, error: "Registration failed" });
};

const login = async () => {
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
        return res.send({ status: "success", message: "Joined" });
      }
      if (!req.user)
        return res
          .status(400)
          .send({ status: "error", error: "Invalid password" });

      req.session.user = {
        _id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol,
      };
      res.send({ status: "success", payload: req.user });
    };
};

const failLogin = async (req, res) => {
  console.log("Access failed");
  res.status(500).send({ error: "Failed" });
};

const authGitHub = () =>
  passport.authenticate(
    "github",
    { scope: ["user:email"] },
    async (req, res) => {}
  );

const failAuthGitHub = () => {
  passport.authenticate("github", { failureRedirect: "/login" }),
    async (req, res) => {
      (req.session.user = req.user), res.redirect("/");
    };
};

export default {
  register,
  failRegister,
  login,
  failLogin,
  authGitHub,
  failAuthGitHub,
};
