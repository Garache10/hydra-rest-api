import Model from "../models/users/user.model";
import { Request, Response } from "express";
import Jwt from "jsonwebtoken";

class UserController {

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await Model.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await Model.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  public async getUserByUsername(req: Request, res: Response): Promise<void> {
    try {
      const user = await Model.findOne({ username: req.params.username });
      res.json(user);
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = new Model(req.body);
      user.password = await user.encryptPassword(user.password);
      await user.save();
      res.json({
        message: "User created successfully",
        user,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

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

  public async updateUser(req: Request, res: Response): Promise<void> {
    const user = new Model(req.body);
    req.body.password = await user.encryptPassword(user.password);
    try {
      const userUpdated = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json({
        message: "User updated successfully",
        userUpdated,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await Model.findByIdAndRemove(req.params.id);
      res.json({
        message: "User deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

export { UserController };
