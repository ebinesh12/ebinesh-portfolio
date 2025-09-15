import { Schema, model, models } from "mongoose";

const CertificateSchema = new Schema({
  superTitle: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  items: [
    {
      title: { type: String, required: true },
      issuer: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: String, required: true },
      pdf: { type: String, required: true },
    },
  ],
});

const CertificateModel =
  models.Certificate || model("Certificate", CertificateSchema);
export default CertificateModel;
