/** @format */

import { Prisma } from "prisma-binding";
import { FragmentReplacements } from "./resolvers/index";
export const prisma = new Prisma({
  typeDefs: "src/generated/prisma-schema.graphql",
  endpoint: "http://192.168.99.100:4466",
  secret: "jainamsecret",
  debug: true,
  fragmentReplacements: FragmentReplacements,
});
