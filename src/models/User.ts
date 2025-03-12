import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => /^\S+@\S+\.\S+$/.test(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  phoneNumber: { type: String, required: false },
  password: { type: String, required: true },
});

userSchema.index({ email: 1 });
userSchema.index({ company_id: 1, role: 1 });

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
