import { inputObjectType } from "nexus";

export const RegisterInput = inputObjectType({
  name: "RegisterInput",
  definition(t) {
    t.string("email");
    t.string("username");
    t.string("password");
  },
});

export const SubInput = inputObjectType({
  name: "SubInput",
  definition(t) {
    t.id("name");
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
    t.nullable.string("image");
  },
});

export const PaginationInput = inputObjectType({
  name: "PaginationInput",
  definition(t) {
    t.int("take");
    t.nullable.id("cursor");
  },
});
