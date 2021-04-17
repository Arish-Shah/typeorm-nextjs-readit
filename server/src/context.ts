import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import prisma from "./lib/prisma";

interface ExpressContext {
  req: Request;
  res: Response;
}

export interface Context extends ExpressContext {
  prisma: PrismaClient;
}

export const context = (ctx: ExpressContext): Context => {
  return { ...ctx, prisma };
};
