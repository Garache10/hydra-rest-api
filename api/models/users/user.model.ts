import Mongoose from "mongoose";
import Bcrypt from "bcrypt";
import IUser from "./user.interface";

var UserSchema = new Mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    accountId: { type: Mongoose.Types.ObjectId, required: true }
  }, {
    timestamps: true,
  }
);

UserSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await Bcrypt.genSalt(10);
  return await Bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await Bcrypt.compare(password, this.password);
};

export default Mongoose.model<IUser>("User", UserSchema);
