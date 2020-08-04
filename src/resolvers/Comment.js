/** @format */

export const Comment = {
  author(parent, args, { db }, info) {
    return db.Users.find((user) => {
      return user.id === parent.author;
    });
  },
  post(parent, args, { db }, info) {
    return db.PostsDatabase.find((post) => {
      return post.id === parent.post;
    });
  },
};
