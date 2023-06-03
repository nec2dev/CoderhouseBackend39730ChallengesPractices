import { Router } from "express";
import sessionController from "../controllers/session.controller.js";

const router = Router();

router.post("/register", sessionController.register);
router.get("/failregister", sessionController.failRegister);
router.post("/login", sessionController.login);
router.get("/faillogin", sessionController.failLogin);
router.post("/authGitHub", sessionController.authGitHub);
router.get("/failAuthGitHub", sessionController.failAuthGitHub);

export default router;
