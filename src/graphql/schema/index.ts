import { makeSchema } from "nexus";
import { join } from "path";

import * as UserTypes from "./user";
import * as SubTypes from "./sub";
import * as PostTypes from "./post";
import * as EnumTypes from "./enum";
import * as InputTypes from "./input";
import * as ScalarTypes from "./scalar";

export const schema = makeSchema({
  types: [UserTypes, SubTypes, PostTypes, EnumTypes, InputTypes, ScalarTypes],
  outputs: {
    schema: join(process.cwd(), "src/generated/schema.graphql"),
    typegen: join(process.cwd(), "src/generated/nexusTypes.ts"),
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
