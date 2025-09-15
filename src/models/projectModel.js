import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  superTitle: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  items: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      gradient: { type: String, required: true },
      icon: { type: String, required: true },
      github: { type: String, required: true },
      demo: { type: String, required: true },
    },
  ],
});

const ProjectModel = models.Project || model("Project", ProjectSchema);
export default ProjectModel;
