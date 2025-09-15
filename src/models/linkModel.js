import { Schema, model, models } from "mongoose";

const LinkSchema = new Schema({
  superTitle: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  connect: {
    title: { type: String, required: true },
    methods: [
      {
        type: { type: String, required: true },
        value: { type: String, required: true },
        href: { type: String }, // Not required for "Location"
        icon: { type: String, required: true },
      },
    ],
  },
});

const LinkModel = models.Link || model("Link", LinkSchema);
export default LinkModel;
