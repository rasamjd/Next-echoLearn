import mongoose from "mongoose";

export default async function databaseConncection() {
  try {
    await mongoose.connect(String(process.env.MONGODB_URI))
    console.log("Connected to MongoDB!")
  } catch (error) {
    console.log("MongoDB connection error: " + error)
  }
}

databaseConncection()
