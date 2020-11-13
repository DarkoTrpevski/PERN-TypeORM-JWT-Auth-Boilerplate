import { Request } from "express"
import { User } from "../entity/User";

export interface IUserRequest extends Request {
  user: User
}