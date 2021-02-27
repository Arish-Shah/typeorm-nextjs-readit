import { Request, Response } from "express";

import { createUserLoader } from "../../utils/createUserLoader";

export interface Context {
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
}
