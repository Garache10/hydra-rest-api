import Model from "../models/users/user.model";
import { Request, Response } from "express";

class UserController {
  
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await Model.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
  } 
}

export { UserController };