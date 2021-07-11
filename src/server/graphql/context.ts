import { NextApiRequest, NextApiResponse } from "next";

interface NextContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

export interface Context extends NextContext {}

export const context = (ctx: NextContext): Context => {
  return {
    ...ctx,
  };
};
