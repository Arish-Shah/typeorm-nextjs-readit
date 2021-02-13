import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import redis from "redis";
import connectRedis from "connect-redis";
import session from "express-session";
import dotenv from "dotenv";

import { __prod__ } from "./constants";
import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/post";

dotenv.config();

const main = async () => {
  const port = process.env.PORT || 4000;

  await createConnection();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      name: process.env.COOKIE_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: __prod__,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7,
      },
    })
  );

  server.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`🚀 Server started on http://localhost:${port}/graphql`);
  });
};

main().catch(console.error);
