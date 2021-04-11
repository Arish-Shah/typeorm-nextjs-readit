import { makeSchema } from "nexus";
import path from "path";

import * as userTypes from "./types/user";
import * as subTypes from "./types/sub";
import * as postTypes from "./types/post";
import * as inputTypes from "./types/input";
import * as scalarTypes from "./types/scalar";
import * as pageTypes from "./types/page";

export const schema = makeSchema({
  types: {
    userTypes,
    subTypes,
    postTypes,
    inputTypes,
    scalarTypes,
    pageTypes,
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
