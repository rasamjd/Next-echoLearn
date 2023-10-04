import mongoose from "mongoose"

const Schema = mongoose.Schema;

const wordSchema = new Schema({
  username: String,
  project: String,
  word: String,
  language: String,
  description: String,
  definitions: Array,
  synonyms: Array,
  antonyms: Array,
  tags: Array,
}, {
   timestamps: true,
});

const Word = mongoose.model("Word", wordSchema);

export default Word;