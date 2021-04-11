import { objectType } from "nexus";

import { Post } from "./post";

export const PaginatedPosts = objectType({
  name: "PaginatedPosts",
  definition(t) {
    t.list.field("posts", {
      type: Post,
    });
    t.boolean("hasMore");
  },
});
