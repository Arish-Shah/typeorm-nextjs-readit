import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import dotev from "dotenv";
import { buildSchema } from "type-graphql";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

import { __prod__ } from "./constants";

dotev.config();

const port = process.env.PORT;

const main = async () => {
  await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/*.ts"],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  const RedisStore = connectRedis(session);
  const client = redis.createClient();

  const app = express();

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      store: new RedisStore({
        client,
        disableTouch: true,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
    })
  );

  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`🚀 Server started on http://localhost:4000/graphql`);
  });
};

main().catch(console.error);
