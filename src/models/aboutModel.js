import { Schema, model, models } from "mongoose";

const AboutSchema = new Schema({
  superTitle: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  story: {
    title: { type: String, required: true },
    paragraphs: [{ type: String, required: true }],
  },
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      duration: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
});

const AboutModel = models.About || model("About", AboutSchema);
export default AboutModel;
