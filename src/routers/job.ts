import * as express from "express";
import { Request, Response } from 'express';
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
    console.log('Inside Job Route, reqJob is: ', title, location, companyName, postedAt, description);

    //Get the User repository
    const userRepository = getManager().getRepository(User);
    
    //Get the user from the middleware
    const user = await userRepository.findOne(req.user);
    console.log('Inside Job Route, user is: ', user);
    console.log('Inside Job Route, req.user is: ', req.user);

    const jobRepository = getManager().getRepository(Job);

    //Create a new User Entity
    const job = jobRepository.create();
    job.title = title;
    job.location = location;
    job.companyName = companyName;
    job.postedAt = postedAt;
    job.description = description;
    job.userid = user;

    //Save Job in DB
    await jobRepository.save(job);

    res.json({message: "Successfully Saved."})

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }

});


export default router;