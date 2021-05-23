import { makeSchema } from "nexus";
import path from "path";

import * as UserTypes from "./user";
import * as ScalarTypes from "./scalar";

export const schema = makeSchema({
  types: [UserTypes, ScalarTypes],
  contextType: {
    module: path.join(process.cwd(), "src/graphql/context.ts"),
    export: "Context",
  },
  outputs: {
    schema: path.join(process.cwd(), "src/generated/schema.gql"),
    typegen: path.join(process.cwd(), "src/generated/nexusTypes.ts"),
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
});
