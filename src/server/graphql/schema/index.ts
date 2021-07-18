import { makeSchema } from "nexus";
import { join } from "path";

import * as userTypes from "./user";
import * as subTypes from "./sub";
import * as postTypes from "./post";
import * as scalarTypes from "./scalar";
import * as inputTypes from "./input";
import * as enumTypes from "./enum";

export const schema = makeSchema({
  types: {
    userTypes,
    subTypes,
    postTypes,
    scalarTypes,
    inputTypes,
    enumTypes,
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
