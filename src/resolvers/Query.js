/** @format */

export const Query = {
  comments(parent, args, { db }, info) {
    return db.CommentsDatabase;
  },
  users(parent, args, { db }, info) {
    return db.Users;
  },
  me() {
    return {
      id: 123,
      name: "Jainam Mehta",
      email: "jainam@jtech.net",
    };
  },
  post(parent, args, { db }, info) {
    return db.PostsDatabase;
  },
};
