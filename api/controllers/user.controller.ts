import Model from "../models/users/user.model";
import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { getAll, create, update, getById, getByParam, deleteById } from "../statics/statics";

class UserController {

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    var users = await getAll(req, res, Model);
    res.json(users);
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    var user = await getById(req, res, Model);
    res.json(user);
  }

  public async getUserByUsername(req: Request, res: Response): Promise<void> {
    let user = await getByParam(req, res, Model);
    res.json(user);
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    let user = new Model(req.body);
    req.body.password = await user.encryptPassword(user.password);
    const response = await create(req, res, Model);
    res.json(response);
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const user = new Model(req.body);
    req.body.password = await user.encryptPassword(user.password);
    const response = await update(req, res, Model);
    res.json(response);
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const response = await deleteById(req, res, Model);
    res.json(response);
  }

  /**Own methods */
  public async loginUser(req: Request, res: Response): Promise<any> {
    try {
      const user = await Model.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      const isValid = await user.validatePassword(req.body.password);
      if (!isValid) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }
      const token: string = Jwt.sign({ _id: user._id }, process.env.SECRET_KEY || 'SECRET_KEY');

      res.json({
        message: "User logged in successfully",
        user,
        token: token
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

export { UserController };
