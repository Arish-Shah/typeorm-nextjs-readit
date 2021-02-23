import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import dotenv from "dotenv";

import { UserResolver } from "./resolvers/user";

dotenv.config();

const main = async () => {
  await createConnection();

  const port = process.env.PORT || 4000;

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      emitSchemaFile: true,
    }),
  });

  const app = express();
  server.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/graphql`);
  });
};

main().catch(console.error);
