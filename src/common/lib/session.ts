import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { ApolloError } from "apollo-server-micro";
import { serialize } from "cookie";

interface Session {
  userId: string;
}

const { COOKIE_NAME, JWT_SECRET } = process.env;

export const setSession = (res: NextApiResponse, session: Session) => {
  const token = jwt.sign(session, JWT_SECRET, {
    expiresIn: "8h",
  });

  const cookie = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    secure: process.env.NODE_ENV === "production",
  });

  res.setHeader("Set-Cookie", cookie);
};

export const getSessionWithoutError = (req: NextApiRequest): Session => {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return null;

  const session = jwt.verify(token, JWT_SECRET) as Session;
  if (!session?.userId) return null;

  return session;
};

export const getSession = (req: NextApiRequest): Session => {
  const session = getSessionWithoutError(req);
  if (!session) throw new ApolloError("unauthenticated");

  return session;
};

export const clearSession = (res: NextApiResponse) => {
  const cookie = serialize(COOKIE_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};
