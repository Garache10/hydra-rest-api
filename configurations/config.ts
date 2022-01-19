import "dotenv/config";
import Mongoose from "mongoose";

Mongoose.connect(`${process.env.MONGODB_URI}`, () => {
    console.log('Connected to db');
    console.log(process.env.MONGODB_URI);
});