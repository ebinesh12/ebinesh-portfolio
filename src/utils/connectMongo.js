import mongoose from "mongoose";

const connectMongo = () => {
  try {
    const clientOptions = {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    };
    mongoose.connect(process.env.MONGO_URI, clientOptions);
  } catch (err) {
    console.log("MongoDB connection error", err);
  }
};

export default connectMongo;
