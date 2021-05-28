import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import prisma from "@/lib/prisma";

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
}

export const context = ({ req, res }): Context => {
  return {
    req,
    res,
    prisma,
  };
};
