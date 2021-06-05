import { inputObjectType } from "nexus";

export const LoginInput = inputObjectType({
  name: "LoginInput",
  definition(t) {
    t.string("username");
    t.string("password");
  },
});

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
    t.string("name");
    t.nullable.string("title");
    t.nullable.string("description");
    t.nullable.string("image");
    t.nullable.string("banner");
  },
});

export const PostInput = inputObjectType({
  name: "Post",
  definition(t) {
    t.string("title");
    t.nullable.string("body");
    t.nullable.string("image");
    t.nullable.string("link");
  },
});
