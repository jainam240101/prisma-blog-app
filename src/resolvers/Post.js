/** @format */

export const Post = {
  author(parent, args, { db }, info) {
    return db.Users.find((user) => {
      return user.id === parent.author;
    });
  },
  comments(parent, arg, ctx, info) {
    return db.CommentsDatabase.find((comment) => {
      return comment.post === parent.id;
    });
  },
};
