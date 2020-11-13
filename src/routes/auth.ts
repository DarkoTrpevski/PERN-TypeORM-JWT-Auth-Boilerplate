import * as express from "express";
import { validInfoMiddleware } from "../middleware/validInfoMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthController } from "../controller/AuthController";

const router = express.Router();
const authController = new AuthController();
router.post("/register", validInfoMiddleware, authController.registerUser);
router.post("/login", validInfoMiddleware, authController.loginUser)
router.get("/me", authMiddleware, authController.checkUserAuth)

export default router;