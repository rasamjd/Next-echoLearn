import { NextApiRequest, NextApiResponse } from "next";
import databaseConncection from "@/app/db/mongodb";
import User from "@/app/models/User.model";
import bcrypt from "bcryptjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const { username, email, password, interested } = await req.body
                
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    interested
  })

  try {
    await databaseConncection()
    await newUser.save()
    return res.json({message: "sighned up seccessfuly!", status: 201})

  } catch (error) {
    return res.json({message: `error : ${error}`, status: 400})
  }
}