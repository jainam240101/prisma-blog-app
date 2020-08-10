/** @format */

import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db/data";
import { prisma } from "./prisma.js";
import { resolvers, FragmentReplacements } from "./resolvers/index";
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: resolvers,
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },
  FragmentReplacements
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
