import Mongoose from "mongoose";

interface IAccount extends Mongoose.Document {
  name: string;
  email: string;
  password: String;
  image: String;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

export default IAccount;