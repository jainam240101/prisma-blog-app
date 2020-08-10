/** @format */

import { Prisma } from "prisma-binding";
import { FragmentReplacements } from "./resolvers/index";
export const prisma = new Prisma({
  typeDefs: "src/generated/prisma-schema.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: "jainamsecret",
  debug: true,
  fragmentReplacements: FragmentReplacements,
});
