import { inputObjectType } from "nexus";

export const RegisterInput = inputObjectType({
  name: "RegisterInput",
  definition(t) {
    t.string("name");
    t.string("email");
    t.date("dateOfBirth");
    t.string("password");
  },
});
