import { inputObjectType } from "nexus";

export const RegisterInput = inputObjectType({
  name: "RegisterInput",
  definition(t) {
    t.string("email");
    t.string("username");
    t.string("password");
  },
});
