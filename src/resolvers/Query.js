/** @format */
import { userid } from "../utils/auth";
export const Query = {
  comments(parent, args, { db, prisma }, info) {
    return prisma.query.comments(null, info);
  },
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
    };
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.users(opArgs, info);
  },
  me(parent, args, { prisma, request }, info) {
    const id = userid(request);
    return prisma.query.user(
      {
        where: {
          id: id,
        },
      },
      info
    );
  },
  async myPosts(parent, args, { prisma, request }, info) {
    const usersid = userid(request);

    const postsdata = await prisma.query.posts({
      where: {
        author: {
          id: usersid,
        },
      },
    });
    return postsdata;
  },
  posts(parent, args, { db, prisma }, info) {
    return prisma.query.posts(
      {
        first: args.first,
        skip: args.skip,
        where: {
          published: true,
        },
      },
      info
    );
  },
  async post(parent, { id }, { prisma, request }, info) {
    const postdata = await prisma.query.post(
      {
        where: {
          id: id,
        },
      },
      info
    );
    return postdata;
  },
};
