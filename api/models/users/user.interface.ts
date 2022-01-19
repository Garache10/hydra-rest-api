import Mongoose from "mongoose";

interface IUser extends Mongoose.Document {
  username: string;
  password: string;
  active: boolean;
  isPremium: boolean;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
};

export default IUser;