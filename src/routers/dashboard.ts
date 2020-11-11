import * as express from "express";
import { Response } from 'express';
import { getManager } from "typeorm";
import { User } from "../entity/User";
import { IUserRequest } from "../types/IUserRequest";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

//Dashboard user
router.get("/", authMiddleware, async(req: IUserRequest, res: Response) => {

  try {
    //Get a User repository to perform operations with user
    const userRepository = getManager().getRepository(User);
    //Load a user by a given id
    const user = await userRepository.findOne(req.user.id)
    console.log('Inside Dashboard Route, the user: ', user);
    return res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }

});
export default router;