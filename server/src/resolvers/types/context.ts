import { Request, Response } from "express";

import { createUserLoader } from "../../utils/createUserLoader";
import { createLikeLoader } from "../../utils/createLikeLoader";

export interface Context {
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  likeLoader: ReturnType<typeof createLikeLoader>;
}
