import { NextFunction, Request, Response } from "express";
import jwt = require("jsonwebtoken");
import { IUserRequest } from "../types/IUserRequest";
require("dotenv").config();

//Middleware used to check if the JWT that is send is valid
// export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
export const authMiddleware = async(req: any, res: Response, next: NextFunction) => {
  try {

      //Grab the token from the request
      const jwtToken: string = req.header("token");
      if(!jwtToken) {
        return res.status(403).json("Not Authorized");
      }
      //Concatinating with ""(process.env.jwtSecret + "") because of dotenv import problems
      const payload: any = jwt.verify(jwtToken, process.env.jwtSecret + "");
      console.log('Inside authMiddleware, request user is: ', req.user)
      console.log('Inside authMiddleware, payload user is: ', payload.user)
      req.user = payload.user;
      next();

  } catch (err) {
    console.log(err.message);
    return res.status(403).json("Not Authorized");
  }

}