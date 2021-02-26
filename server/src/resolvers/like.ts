import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { Like } from "../entities/Like";
import { isAuth } from "../middleware/isAuth";
import { Context } from "./types/context";

@Resolver(Like)
export class LikeResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async like(@Arg("postID", () => ID) postID: string, @Ctx() { req }: Context) {
    // @ts-ignore
    const { userID: creatorID } = req.session;

    // Find, if exists delete, else create
    const existingLike = await Like.findOne({
      where: { postID, creatorID },
    });
    if (existingLike) {
      Like.delete({ postID, creatorID });
    } else {
      Like.create({ postID, creatorID }).save();
    }
    return true;
  }
}
