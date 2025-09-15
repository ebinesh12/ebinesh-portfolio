import { Schema, model, models } from "mongoose";

const AchievementItemSchema = new Schema({
  icon: {
    type: String,
    required: [true, "Please provide an icon for the achievement."],
  },
  title: {
    type: String,
    required: [true, "Please provide a title for the achievement."],
  },
  description: {
    type: String,
    required: [true, "Please provide a description for the achievement."],
  },
});

// This is the main schema for the entire "Achievements" section.
const AchievementsSchema = new Schema({
  superTitle: {
    type: String,
    required: [true, "Please provide a super title."],
  },
  title: {
    type: String,
    required: [true, "Please provide a title."],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
  },
  items: [AchievementItemSchema], // An array of achievement items
});

const AchievementModel =
  models.Achievement || model("Achievement", AchievementsSchema);
export default AchievementModel;
