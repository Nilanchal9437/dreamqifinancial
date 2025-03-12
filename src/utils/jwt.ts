import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const signToken = async (payload: JWTPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(`${process.env.JWT_SECRET}`));
};

export const verifyToken = async (token: string) => {
  return await jwtVerify(
    token,
    new TextEncoder().encode(`${process.env.JWT_SECRET}`)
  );
};
