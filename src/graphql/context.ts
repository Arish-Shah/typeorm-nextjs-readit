import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import prisma from "@/lib/prisma";
import { getUserId } from "@/common/lib/token";

interface NextContext {
  req: NextApiRequest;
  res: NextApiResponse;
  userId?: string;
}

export interface Context extends NextContext {
  prisma: PrismaClient;
}

export const context = ({ req, res }: NextContext): Context => {
  return {
    req,
    res,
    prisma,
    userId: getUserId(req),
  };
};
