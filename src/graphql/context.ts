import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import prisma from "@/lib/prisma";

interface NextContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

export interface Context extends NextContext {
  prisma: PrismaClient;
}

export const context = ({ req, res }: NextContext): Context => {
  return { req, res, prisma };
};
