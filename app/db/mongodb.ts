import mongoose from "mongoose";

const uri = "mongodb+srv://Rasa:rasarasadbaccess@cluster0.yo8wl.mongodb.net/echoLearnDatabase?retryWrites=true&w=majority"
const uri2 = "mongodb+srv://nextRasa:next-echoLearn@cluster0.yo8wl.mongodb.net/?retryWrites=true&w=majority"

export default async function databaseConncection() {
  try {
    await mongoose.connect(String(process.env.MONGODB_URI))
    console.log("Connected to MongoDB!")
  } catch (error) {
    console.log("MongoDB connection error: " + error)
  }
}

databaseConncection()