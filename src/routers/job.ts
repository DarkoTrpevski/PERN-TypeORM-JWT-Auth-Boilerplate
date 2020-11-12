import * as express from "express";
import { Response } from 'express';
import { getManager } from "typeorm";
import { Job } from "../entity/Job";
import { User } from "../entity/User";
import { authMiddleware } from "../middleware/authMiddleware";
import { IUserRequest } from "../types/IUserRequest";
const router = express.Router();


//Create a job
router.post("/", authMiddleware, async(req: IUserRequest, res: Response) => {

  try {
    const { title, location, companyName, postedAt, description }: Job = req.body;

    //Create User repository
    const userRepository = getManager().getRepository(User);
    //Create Job repository
    const jobRepository = getManager().getRepository(Job);

    //Get the user id from the middleware, and the user from the repository
    const user = await userRepository.findOne(req.user);
    
    //Create a new Job Entity Object
    const job = jobRepository.create();
    job.title = title;
    job.location = location;
    job.companyName = companyName;
    job.postedAt = postedAt;
    job.description = description;
    job.user = user;

    //Save Job in DB
    await jobRepository.save(job);
    res.json({message: "Successfully Saved."})
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }

});

//Get all jobs from current user
router.get("/", authMiddleware, async(req: IUserRequest, res: Response) => {
  try {
    //Create Job repository
    const jobRepository = getManager().getRepository(Job);
    const jobs = await jobRepository.find({
      relations: ["user"],
      where: {
        user: {
          id: req.user
        }
      }
    });
    res.status(200).json(jobs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;