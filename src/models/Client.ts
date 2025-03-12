import mongoose, { Schema, Document } from "mongoose";

interface IClient extends Document {
  name: string;
  hash: string;
  company_id: Schema.Types.ObjectId;
  created_at: Date;
}

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true },
  hash: { type: String, required: false },
  company_id: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  created_at: { type: Date, require: true },
});

const Client =
  mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema);

export default Client;
