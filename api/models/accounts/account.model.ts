import Mongoose from "mongoose";
import IAccount from "./account.interface";
import Bcrypt from "bcrypt";

const AccountSchema = new Mongoose.Schema<IAccount>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isPremium: { type: Boolean, default: false },
  image: { type: String }
}, {
  timestamps: true
});

AccountSchema.methods.encryptPassword = async (password: string): Promise<String> => {
  const salt = await Bcrypt.genSalt(10);
  return await Bcrypt.hash(password, salt);
}

AccountSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await Bcrypt.compare(this.password, password);
};

export default Mongoose.model("Account", AccountSchema);