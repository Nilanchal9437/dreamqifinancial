import mongoose, { Schema, Document } from "mongoose";

interface IChat extends Document {
  created_at: Date;
  answer: { [key: string | number]: string | number }[];
}

const ChatSchema: Schema = new Schema({
  answer: { type: Array, required: true },
  created_at: { type: Date, required: true },
});

const Chat = mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);

export default Chat;
