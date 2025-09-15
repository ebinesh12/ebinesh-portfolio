import { Schema, model, models } from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required."],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

contactSchema.plugin(autoIncrement, {
  model: "Contact", // The name of the model
  field: "id", // The field to auto-increment
  startAt: 1, // The number to start with
  incrementBy: 1, // The amount to increment by
});

const ContactModel = models.Contact || model("Contact", contactSchema);
export default ContactModel;

// const contactSchema= new Schema({
//     name: String,
//     email: String,
//     subject: String,
//     message: String
// },{toJSON:{virtuals:true}});

// contactSchema.virtual('short_msg').get(function (){
//     return this.message.substr(0, 50)+'...'
// });
