import { PrismaClient } from "@prisma/client";

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

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
