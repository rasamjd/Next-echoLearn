import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  username: String,
  title: String,
  language: String,
}, {
   timestamps: true,
});

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;