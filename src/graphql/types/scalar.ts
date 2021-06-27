import { Kind } from "graphql";
import { scalarType } from "nexus";

export const DateScalar = scalarType({
  name: "DateTime",
  asNexusMethod: "date",
  parseValue(value: string) {
    return new Date(value);
  },
  serialize(value: Date) {
    return value.toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },
});
