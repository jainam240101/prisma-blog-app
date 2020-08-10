/** @format */
import "@babel/polyfill"
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
  FragmentReplacements,
});

const options = {
  port: process.env.PORT || 8000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
};

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log("Server is up on port 4000")
})
