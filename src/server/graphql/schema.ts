import { makeSchema } from "nexus";
import { join } from "path";

export const schema = makeSchema({
  types: {},
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
