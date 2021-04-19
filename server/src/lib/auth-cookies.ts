import { Response } from "express";

export const setTokenCookie = (token: string, res: Response) => {
  res.cookie(process.env.COOKIE_NAME!, token, {
    httpOnly: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
};

export const removeTokenCookie = (res: Response) => {
  res.cookie(process.env.COOKIE_NAME!, "", {
    path: "/",
    maxAge: -1,
  });
};
