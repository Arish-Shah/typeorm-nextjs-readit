import { scalarType } from "nexus";

export const DateScalar = scalarType({
  name: "DateTime",
  asNexusMethod: "date",
});
