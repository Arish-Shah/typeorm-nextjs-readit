import { buildSchemaSync } from "type-graphql";

import { UserResolver } from "./resolvers/user";
import { SubResolver } from "./resolvers/sub";
import { PostResolver } from "./resolvers/post";
import { CommentResolver } from "./resolvers/comment";

export const schema = buildSchemaSync({
  resolvers: [UserResolver, SubResolver, PostResolver, CommentResolver],
  emitSchemaFile: true,
});
