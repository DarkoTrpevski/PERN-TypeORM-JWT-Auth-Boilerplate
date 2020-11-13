import { Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";
import { IUserRequest } from "../types/IUserRequest";

export class DashboardController {

  constructor(){}

  public getDashboardUser = async(req: IUserRequest, res: Response) => {

    try {
      //Get a User repository to perform operations with user
      const userRepository = getManager().getRepository(User);
      //Load a user by a given id
      const user = await userRepository.findOne(req.user)
      console.log('Inside Dashboard Route, the user: ', user);
      return res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
}