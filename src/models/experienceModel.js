import { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema({
  superTitle: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  jobs: [
    {
      role: { type: String, required: true },
      company: { type: String, required: true },
      duration: { type: String, required: true },
      responsibilities: [{ type: String, required: true }],
    },
  ],
});

const ExperienceModel =
  models.Experience || model("Experience", ExperienceSchema);
export default ExperienceModel;
