import { Response } from "express";
import { serialize } from "cookie";

export const setTokenCookie = (token: string, res: Response) => {
  const cookie = serialize(process.env.COOKIE_NAME!, token, {
    httpOnly: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  res.setHeader("Set-Cookie", cookie);
};

export const removeTokenCookie = (res: Response) => {
  const cookie = serialize(process.env.COOKIE_NAME!, "", {
    path: "/",
    maxAge: -1,
  });

  res.setHeader("Set-Cookie", cookie);
};
