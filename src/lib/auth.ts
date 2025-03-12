import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import User from "@/models/User";

export const createUser = async (
  email: string,
  password: string,
  role: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, role });
  await user.save();
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = await new SignJWT({
    id: user._id,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(`${process.env.JWT_SECRET}`));

  return token;
};
