import passport from "passport";
import DAO from "../persistence/DAOs/factory.js";

const SessionManager = DAO.sessions;

class SessionController {
  signup = (req, res) => {
    passport.authenticate("signup", (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.status(500).json({ message: err });
        }
        const { _id, username } = user;
        const token = jwt.sign({ _id, username }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
      });
    })(req, res);
  };

  login = (req, res) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.status(500).json({ message: err });
        }
        const { _id, username } = user;
        const token = jwt.sign({ _id, username }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
      });
    })(req, res);
  };

  logout = (req, res) => {
    req.logout();
    res.send({ status: "success", message: "logout" });
  };

  profile = (req, res) => {
    res.send({ status: "success", message: "profile" });
  };
}

export default new SessionController();
