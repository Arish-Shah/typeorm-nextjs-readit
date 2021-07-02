import { inputObjectType } from "nexus";

export const RegisterInput = inputObjectType({
  name: "RegisterInput",
  definition(t) {
    t.string("name");
    t.string("email");
    t.nullable.string("image");
    t.string("password");
  },
});

export const LoginInput = inputObjectType({
  name: "LoginInput",
  definition(t) {
    t.string("email");
    t.string("password");
  },
});
