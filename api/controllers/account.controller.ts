import { Request, Response } from "express";
import Model from "../models/accounts/account.model";
import Jwt from "jsonwebtoken";
import { getAll, getById, getByParam, create, update, deleteById } from "../statics/statics";

class AccountController {

  public async getAllAccounts(req: Request, res: Response): Promise<void> {
    var accounts = await getAll(req, res, Model);
    res.json(accounts);
  }

  public async getAccountById(req: Request, res: Response): Promise<void> {
    var account = await getById(req, res, Model);
    res.json(account);
  }

  public async getAccountByEmail(req: Request, res: Response): Promise<void> {
    let account = await getByParam(req, res, Model);
    res.json(account);
  }

  public async createAccount(req: Request, res: Response): Promise<void> {
    let account = new Model(req.body);
    req.body.password = await account.encryptPassword(account.password);
    const response = await create(req, res, Model);
    res.json(response);
  }

  public async updateAccount(req: Request, res: Response): Promise<void> {
    let account = new Model(req.body);
    req.body.password = await account.encryptPassword(account.password);
    const response = await update(req, res, Model);
    res.json(response);
  }

  public async deleteAccount(req: Request, res: Response): Promise<void> {
    const response = await deleteById(req, res, Model);
    res.json(response);
  }

  /**Own methods */
  public async loginAccount(req: Request, res: Response): Promise<any> {
    try {
      const account = await Model.findOne({ email: req.body.email });
      if (!account) {
        return res.status(404).json({
          message: "Account not found",
        });
      }
      const isValid = await account.validatePassword(req.body.password);
      if (!isValid) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }
      const token: string = Jwt.sign({ _id: account._id }, process.env.SECRET_KEY || 'SECRET_KEY');  
      res.json({
        message: "Account logged in successfully",
        account,
        token: token
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

export { AccountController };