import { Schema, model, models } from "mongoose";

const HeroSchema = new Schema({
  personalInfo: {
    greeting: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    availability: { type: String, required: true },
    photo: { type: String, required: true },
  },
  about: {
    summary: { type: String, required: true },
  },
  actions: [
    {
      id: { type: String, required: true },
      text: { type: String, required: true },
      href: { type: String, required: true },
      icon: { type: String, required: true },
    },
  ],
  socialLinks: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true },
      color: { type: String, required: true },
      show: { type: Boolean, default: true },
    },
  ],
});

const HeroModel = models.Hero || model("Hero", HeroSchema);
export default HeroModel;
