import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const createToken = (user: User): string => {
  return jwt.sign({ username: user.username }, process.env.JWT_SECRET);
};

export const readToken = (token: string): { username: string } => {
  return jwt.verify(token, process.env.JWT_SECRET) as any;
};
