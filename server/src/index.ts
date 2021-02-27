import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";

import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/post";
import { LikeResolver } from "./resolvers/like";
import { createUserLoader } from "./utils/createUserLoader";
import { createLikeLoader } from "./utils/createLikeLoader";

dotenv.config();

const main = async () => {
  const port = process.env.PORT || 4000;

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver, LikeResolver],
      emitSchemaFile: true,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      userLoader: createUserLoader(),
      likeLoader: createLikeLoader(),
    }),
  });

  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      name: process.env.COOKIE_NAME,
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7,
      },
    })
  );

  server.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/graphql`);
  });
};

main().catch(console.error);
