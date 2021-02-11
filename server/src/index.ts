import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/posts";
import { SubResolver } from "./resolvers/subs";
import { CommentResolver } from "./resolvers/comments";

dotenv.config();

const main = async () => {
  const connection = await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver, SubResolver, CommentResolver],
    }),
    context: ({ req, res }) => ({ req, res, connection }),
  });

  const app = express();

  app.use(
    cors({
      origin: process.env.ORIGIN,
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );

  app.use(cookieParser());

  server.applyMiddleware({ app, cors: false });

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`🚀 Server started on http://localhost:${port}/graphql`);
  });
};

main().catch(console.error);
