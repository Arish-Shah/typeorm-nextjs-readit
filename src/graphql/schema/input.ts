import { inputObjectType } from "nexus";

export const SubInput = inputObjectType({
  name: "SubInput",
  definition(t) {
    t.string("name");
    t.nullable.string("title");
    t.nullable.string("description");
    t.nullable.string("image");
    t.nullable.string("banner");
  },
});

export const PostInput = inputObjectType({
  name: "PostInput",
  definition(t) {
    t.string("title");
    t.string("body");
    t.field("postType", {
      type: "PostType",
    });
  },
});

export const PaginationInput = inputObjectType({
  name: "PaginationInput",
  definition(t) {
    t.id("cursor");
    t.int("take");
  },
});
