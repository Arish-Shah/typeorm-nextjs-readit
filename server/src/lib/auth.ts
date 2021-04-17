import { AuthenticationError } from "apollo-server-express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { setTokenCookie } from "./auth-cookies";

interface Session {
  userId: string;
}

export const setSession = (session: Session, res: Response) => {
  const token = jwt.sign(session, process.env.JWT_SECRET!, {
    expiresIn: "8h",
  });

  setTokenCookie(token, res);
};

export const getSession = (req: Request, throwError = false) => {
  const token = req.cookies[process.env.COOKIE_NAME!];

  if (!token) {
    if (throwError) throw new AuthenticationError("unauthenticated");
    else return;
  }

  const session = jwt.verify(token, process.env.JWT_SECRET!) as Session;
  return session;
};
