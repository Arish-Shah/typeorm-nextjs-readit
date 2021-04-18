import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import dotenv from "dotenv";

import { schema } from "./schema";
import { context } from "./context";

dotenv.config();

const server = new ApolloServer({
  schema,
  context,
});

const app = express();

server.applyMiddleware({
  app,
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  },
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 GraphQL server running on http://localhost:4000/graphql`);
});
