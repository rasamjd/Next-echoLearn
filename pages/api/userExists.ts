import { NextApiRequest, NextApiResponse } from "next";
import databaseConncection from "@/app/db/mongodb";
import User from "@/app/models/User.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await databaseConncection()
    const { username } = await req.body
    const user = await User.find({ username })
    res.status(200).json({ message: user })
  } catch (error) {
    console.log(error)
  }
}