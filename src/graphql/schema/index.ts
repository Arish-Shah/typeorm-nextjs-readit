import { makeSchema } from "nexus";
import path from "path";

import * as UserTypes from "./user";
import * as AuthTypes from "./auth";
import * as SubTypes from "./sub";
import * as PostTypes from "./post";
import * as ScalarTypes from "./scalar";
import * as InputTypes from "./input";

export const schema = makeSchema({
  types: [UserTypes, ScalarTypes, AuthTypes, InputTypes, SubTypes, PostTypes],
  outputs: {
    schema: path.join(process.cwd(), "src/generated/schema.graphql"),
    typegen: path.join(process.cwd(), "src/generated/nexusTypes.ts"),
  },
  contextType: {
    module: path.join(process.cwd(), "src/graphql/context.ts"),
    export: "Context",
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
});
