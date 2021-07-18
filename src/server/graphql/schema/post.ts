import { objectType } from "nexus";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.string("slug");
    t.string("title");
    t.string("body");
    t.field("postType", {
      type: "PostType",
    });
    t.date("createdAt");
    t.date("updatedAt");
    t.string("userId");
    t.string("subName");
  },
});
