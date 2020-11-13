import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";
import jwtGenerator from "../utils/jwtGenerator";

export class AuthController {

  constructor(){}

  public registerUser = async(req: Request, res: Response) => {

    try {
      const{ name, email, password } = req.body;
  
        //Get the User repository
        const userRepository = getManager().getRepository(User);
  
        //Load a user by a given email
        const foundUser = await userRepository.findOne({ email: email })
        //If user is found return 401 to the client
        if (foundUser) {
          return res.status(401).json("User already exist!");
        }
        //If User is NOT found, salt the password of the user
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
  
        //Create a new User Entity
        const user = userRepository.create();
        user.name = name;
        user.email = email;
        user.password = bcryptPassword;
        user.jobs = [];
        //Save User in DB
        const savedUser = await userRepository.save(user);
        //Generate
        const jwtToken = jwtGenerator(savedUser.id);
        //Return a JWT
        res.json({ jwtToken });
  
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  
  }

  public loginUser = async(req, res) => {
    try {
  
      const{ email, password } = req.body;
  
      //Get a User repository to perform operations with post
      const userRepository = getManager().getRepository(User);
  
      //Load a user by a given email
      const foundUser = await userRepository.findOne({ email: email })
      //If user is found return 401 to the client
      if (!foundUser) {
        return res.status(401).json("Invalid credentials");
      }
  
  
      //Compare the passwords
      const validPassword = await bcrypt.compare(password, foundUser.password);
      if(!validPassword) {
        return res.status(401).json("Invalid credentials")
      }
  
      //Generate
      const jwtToken = jwtGenerator(foundUser.id);
      //Return a JWT
      res.json({ jwtToken });
      // return res.json({ jwtToken });
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
  public checkUserAuth = async(req, res) => {
    try {
      //If the user passes our middleware, we know the user is valid
      res.json(true);
      
    } catch (err) {
      console.error(err.message);
      res.status(403).json("User is not authorized");
    }
  }

}