import { AuthenticationError } from "apollo-server-micro";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

interface Payload {
  userId: string;
}

export const createToken = (payload: Payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

export const getUserId = (req: NextApiRequest): string => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      throw new AuthenticationError("unauthenticated");
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as Payload;
    return userId;
  }
  throw new AuthenticationError("unauthenticated");
};
