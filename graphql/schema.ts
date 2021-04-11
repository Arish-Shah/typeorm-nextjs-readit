import { makeSchema } from "nexus";
import path from "path";

import * as userTypes from "./types/user";
import * as inputTypes from "./types/input";
import * as scalarTypes from "./types/scalar";

export const schema = makeSchema({
  types: {
    userTypes,
    inputTypes,
    scalarTypes,
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
  outputs: {
    schema: path.join(process.cwd(), "generated", "schema.graphql"),
    typegen: path.join(process.cwd(), "generated", "typegen.ts"),
  },
  contextType: {
    module: path.join(process.cwd(), "graphql", "context.ts"),
    export: "Context",
  },
});
