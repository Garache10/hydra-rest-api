import Mongoose from "mongoose";

interface IAccount extends Mongoose.Document {
  name: string;
  email: string;
  password: string;
  isPremium: Boolean;
  image: String;
  encryptPassword(password: string): Promise<String>;
  validatePassword(password: string): Promise<boolean>;
}

export default IAccount;