import * as express from "express";
import { JobController } from "../controller/JobController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const jobController = new JobController();
//Save a job
router.post("/", authMiddleware, jobController.saveJob);
//Get all jobs from current user
router.get("/", authMiddleware, jobController.getSavedJobs);
export default router;