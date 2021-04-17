import { objectType } from "nexus";

import { Post } from "./post";
import { Comment } from "./comment";

export const PaginatedPosts = objectType({
  name: "PaginatedPosts",
  definition(t) {
    t.list.field("posts", {
      type: Post,
    });
    t.boolean("hasMore");
  },
});

export const PaginatedComments = objectType({
  name: "PaginatedComments",
  definition(t) {
    t.list.field("comments", {
      type: Comment,
    });
    t.boolean("hasMore");
  },
});
