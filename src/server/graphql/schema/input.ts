import { inputObjectType } from "nexus";

export const SubInput = inputObjectType({
  name: "SubInput",
  definition(t) {
    t.string("name");
    t.nullable.string("title");
    t.nullable.string("text");
    t.nullable.string("image");
    t.nullable.string("banner");
  },
});
