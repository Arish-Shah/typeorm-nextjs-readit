import { NextApiResponse } from "next";
import { serialize } from "cookie";

const COOKIE_NAME = process.env.COOKIE_NAME;

export const setTokenCookie = (token: string, res: NextApiResponse) => {
  const cookie = serialize(COOKIE_NAME, token, {
    httpOnly: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  res.setHeader("Set-Cookie", cookie);
};

export const removeTokenCookie = (res: NextApiResponse) => {
  const cookie = serialize(COOKIE_NAME, "", {
    path: "/",
    maxAge: -1,
  });

  res.setHeader("Set-Cookie", cookie);
};
