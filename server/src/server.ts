import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";

import { schema } from "./schema";
import { context } from "./context";

dotenv.config();

const server = new ApolloServer({
  schema,
  context,
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀 GraphQL server running on ${url}`);
});
