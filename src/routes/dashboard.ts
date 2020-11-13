import * as express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { DashboardController } from "../controller/DashboardController";

const router = express.Router();
const dashboardController = new DashboardController();
//Get the current Dashboard user
router.get("/", authMiddleware, dashboardController.getDashboardUser);
export default router;