import { objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("email");
    t.string("username");
    t.nullable.string("name");
    t.nullable.string("image");
    t.date("createdAt");
    t.date("updatedAt");
  },
});
