import { makeSchema } from "nexus";
import { join } from "path";

import * as userTypes from "./types/user";
import * as scalarTypes from "./types/scalar";
import * as inputTypes from "./types/input";

export const schema = makeSchema({
  types: {
    userTypes,
    scalarTypes,
    inputTypes,
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
