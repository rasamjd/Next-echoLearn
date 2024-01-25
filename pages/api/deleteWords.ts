import { NextApiRequest, NextApiResponse } from 'next';
import databaseConncection from "@/app/db/mongodb";
import Word from '@/app/models/Word.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { username, project, word } = await req.body

  try {
    await databaseConncection()
    const wordsList = await Word.deleteOne({ username, project, word })
    return res.json({ message: wordsList, status: 201 })

  } catch (error) {
    return res.json({ message: `error : ${error}`, status: 400 })
  }  
}
