/** @format */
import { userid } from "../utils/auth";

export const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId,
              },
            },
          },
        },
        info
      );
    },
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(null, info);
    },
  },
  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const usersid = userid(request);
      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: usersid,
              },
            },
          },
        },
        info
      );
    },  
  },
};
