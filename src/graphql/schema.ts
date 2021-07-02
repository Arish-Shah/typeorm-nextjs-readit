import { makeSchema } from "nexus";
import { join } from "path";

import * as userTypes from "./types/user";
import * as authTypes from "./types/auth";
import * as inputTypes from "./types/input";
import * as scalarTypes from "./types/scalar";

export const schema = makeSchema({
  types: {
    userTypes,
    authTypes,
    inputTypes,
    scalarTypes,
  },
  outputs: {
    schema: join(process.cwd(), "src/generated/schema.graphql"),
    typegen: join(process.cwd(), "src/generated/nexus-types.ts"),
  },
  contextType: {
    module: join(process.cwd(), "src/graphql/context.ts"),
    export: "Context",
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
});
