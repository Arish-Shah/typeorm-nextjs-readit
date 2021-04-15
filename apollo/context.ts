import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "~/lib/prisma";

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
}

export const context = ({ req, res }) => {
  return { req, res, prisma };
};
