/** @format */

import { GraphQLServer, PubSub } from "graphql-yoga";
import { Comment } from "./resolvers/Comment";
import { Mutation } from "./resolvers/Mutations";
import { Post } from "./resolvers/Post";
import { Query } from "./resolvers/Query";
import { User } from "./resolvers/User";
import db from "./db/data";
import { Subscription } from "./resolvers/subsciption";
import { prisma } from "./prisma.js";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Comment,
    Mutation,
    Post,
    Subscription,
    Query,
  },
  context: {
    db,
    pubsub,
    prisma,
  },
});

const options = {
  port: 8000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
};

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
);
