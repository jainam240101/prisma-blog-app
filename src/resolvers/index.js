/** @format */
import { extractFragmentReplacements} from "prisma-binding"
import { Comment } from "./Comment";
import { Mutation } from "./Mutations";
import { Subscription } from "./subsciption";
import { Post } from "./Post";
import { Query } from "./Query";
import { User } from "./User";

const resolvers = {
  Comment,
  User,
  Mutation,
  Post,
  Subscription,
  Query,
};

let FragmentReplacements=extractFragmentReplacements(resolvers)

export {resolvers,FragmentReplacements}