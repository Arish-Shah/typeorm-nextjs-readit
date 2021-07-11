import { makeSchema } from "nexus";
import { join } from "path";

export const schema = makeSchema({
  types: {},
  outputs: {
    schema: join(process.cwd(), "src/server/schema.gql"),
    typegen: join(process.cwd(), "src/server/nexus-types.ts"),
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
