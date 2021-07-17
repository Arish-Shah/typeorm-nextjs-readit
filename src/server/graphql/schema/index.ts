import { makeSchema } from "nexus";
import { join } from "path";

import * as userTypes from "./user";
import * as scalarTypes from "./scalar";

export const schema = makeSchema({
  types: {
    userTypes,
    scalarTypes,
  },
  outputs: {
    schema: join(process.cwd(), "src/server/graphql/generated/schema.graphql"),
    typegen: join(process.cwd(), "src/server/graphql/generated/nexus-types.ts"),
  },
  contextType: {
    module: join(process.cwd(), "src/server/graphql/context.ts"),
    export: "Context",
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
});
