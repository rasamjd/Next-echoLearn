import { NextApiRequest, NextApiResponse } from 'next';
import databaseConncection from "@/app/db/mongodb";
import Word from '@/app/models/Word.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // const { username, project, word } = await req.body
  const { username, project, word, language, description, definitions, synonyms, antonyms, tags } = await req.body

  try {
    await databaseConncection()
    const wordsList = await Word.replaceOne(
      {
        username,
        project,
        word,
      }, 
      { 
        username,
        project,
        word,
        language,
        description,
        definitions,
        synonyms,
        antonyms,
        tags,
      })
    return res.json({ message: wordsList, status: 201 })

  } catch (error) {
    return res.json({ message: `error : ${error}`, status: 400 })
  }  
}
