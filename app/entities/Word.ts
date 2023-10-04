export interface IWord {
  username: string,
  project: string,
  word: string,
  language: string,
  description: string
  definitions: Array<string[3]>,
  synonyms: Array<string[3]>,
  antonyms: Array<string[3]>,
  tags: Array<string[4]>,
}