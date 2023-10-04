import { NextApiRequest, NextApiResponse } from 'next';
import databaseConncection from "@/app/db/mongodb";
import Word from '@/app/models/Word.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { username, project, word, language, description, definitions, synonyms, antonyms, tags } = await req.body

  const newWord = new Word({
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

  try {
    await databaseConncection()
    await newWord.save()  
    return res.json({message: "word added seccessfuly!", status: 201})

  } catch (error) {
    return res.json({message: `error : ${error}`, status: 400})
  }  
}
