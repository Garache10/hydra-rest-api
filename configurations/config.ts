import "dotenv/config";
import Mongoose from "mongoose";

Mongoose.connect(`${process.env.STRING_DB}`, () => {
    console.log('Connected to db');
});