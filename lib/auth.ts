import { AuthenticationError } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { setTokenCookie } from "./auth-cookies";

interface Session {
  userId: string;
}

export const setSession = (session: Session, res: NextApiResponse) => {
  const token = jwt.sign(session, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  setTokenCookie(token, res);
};

export const getSession = (req: NextApiRequest, throwError = false) => {
  const token = req.cookies[process.env.COOKIE_NAME];

  if (!token) {
    if (throwError) throw new AuthenticationError("unauthenticated");
    else return;
  }

  const session = jwt.verify(token, process.env.JWT_SECRET) as Session;
  return session;
};
