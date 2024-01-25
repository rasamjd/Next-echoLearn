import { NextApiRequest, NextApiResponse } from 'next';
import databaseConncection from "@/app/db/mongodb";
import Project from '@/app/models/Project.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { username, title, language } = await req.body

  const newProject = new Project({
    username,
    title, 
    language
  })
  
  try {
    await databaseConncection()
    await newProject.save()  
    return res.json({message: "project added seccessfuly!", status: 201})

  } catch (error) {
    return res.json({message: `error : ${error}`, status: 400})
  }  
}
