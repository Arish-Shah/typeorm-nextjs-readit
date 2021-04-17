import { makeSchema } from "nexus";

import * as userTypes from "./types/user";
import * as subTypes from "./types/sub";
import * as postTypes from "./types/post";
import * as commentTypes from "./types/comment";
import * as voteTypes from "./types/vote";
import * as inputTypes from "./types/input";
import * as scalarTypes from "./types/scalar";
import * as pageTypes from "./types/page";

export const schema = makeSchema({
  types: {
    userTypes,
    subTypes,
    postTypes,
    commentTypes,
    voteTypes,
    inputTypes,
    scalarTypes,
    pageTypes,
  },
  outputs: {
    schema: __dirname + "/../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
  nonNullDefaults: {
    output: true,
    input: true,
  },
});
