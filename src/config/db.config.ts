import mongoose from "mongoose";

const connectDB = (url: any) => {
  console.log("THIS IS ENV", url, process.env.DB_NAME);
  mongoose.connect(url, {
    dbName: process.env.DB_NAME,
  });
};

export default connectDB;
