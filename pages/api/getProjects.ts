import { NextApiRequest, NextApiResponse } from 'next';
import databaseConncection from "@/app/db/mongodb";
import Project from '@/app/models/Project.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { user } = await req.body
  
  try {
    await databaseConncection()
    const projectsList = await Project.find({ username: user })
    return res.json({ message: projectsList, status: 201})

  } catch (error) {
    return res.json({ message: `error : ${error}`, status: 400})
  }  
}
