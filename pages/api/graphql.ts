import { ApolloServer } from "apollo-server-micro";

import { schema } from "@graphql/schema";
import { createContext } from "@graphql/context";

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: process.env.NODE_ENV === "development",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
