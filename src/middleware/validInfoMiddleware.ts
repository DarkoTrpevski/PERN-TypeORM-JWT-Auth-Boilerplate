import { NextFunction, Request, Response } from "express";

//Middleware used to check if credentials are valid
export const validInfoMiddleware = (req: Request, res: Response, next: NextFunction) => {

  try {
    const { email, name, password } = req.body;

    //Check if email is valid
    const isValidEmail = (userEmail: string): boolean => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    
    //If the user is registering
    if (req.path === "/register") {
      //Check if the user input is empty
      if (![email, name, password].every(Boolean)) {
        console.log('Inside validInfoMiddleware register path, Credentials are missing');
        return res.status(401).json("Missing Credentials");
      } else if (!isValidEmail(email)) {
        console.log('Inside validInfoMiddleware register path, Email is invalid');
        return res.status(401).json("Invalid Email");
      }
      
      //If the user is logging in    
    } else if (req.path === "/login") {
      //Check if the user input is empty
      if (![email, password].every(Boolean)) {
        console.log('Inside validInfoMiddleware login path, Credentials are missing');
        return res.status(401).json("Missing Credentials");
      } else if (!isValidEmail(email)) {
        console.log('Inside validInfoMiddleware login path, Email is invalid');
        return res.status(401).json("Invalid Email");
      }
    }
    
    next();
  } catch (err) {
    console.log('Inside validInfoMiddleware, error is: ', err.message);
  }
  
};