import { Schema, model, models } from "mongoose";

const SkillItemSchema = new Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
});

const SkillCategorySchema = new Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  items: [SkillItemSchema],
});

const SkillsSchema = new Schema({
  superTitle: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: [SkillCategorySchema],
});

const SkillModel = models.Skill || model("Skill", SkillsSchema);
export default SkillModel;
