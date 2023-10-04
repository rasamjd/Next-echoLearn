import { NextApiRequest, NextApiResponse } from "next";
import databaseConncection from "@/app/db/mongodb";
import Project from "@/app/models/Project.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await databaseConncection()
    const { username, title } = await req.body
    const project = await Project.find({ username, title })
    res.status(200).json({ message: project })
  } catch (error) {
    console.log(error)
  }
}