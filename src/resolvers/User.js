/** @format */

import { userid } from "../utils/auth";

export const User = {
  email: {
    fragment: "fragment userId on User {id}",
    resolve(parent, query, { request }, info) {
      const id = userid(request);
      if (id && id === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    },
  },
  posts: {
    fragment: "fragment userId on User {id}",
    resolve(parent, query, { request, prisma }, info) {
      const id = userid(request);
      if (id && id === parent.id) {
        return prisma.query.posts({
          where: {
            published: true,
          },
        });
      } else {
        return null;
      }
    },
  },
};
