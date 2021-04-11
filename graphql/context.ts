import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import prisma from "@lib/prisma";

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
}

export const createContext = ({ req, res }) => {
  return { req, res, prisma };
};
