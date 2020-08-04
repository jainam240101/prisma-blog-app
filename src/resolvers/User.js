/** @format */

export const User = {
  posts(parent, args, { db }, info) {
    return db.PostsDatabase.filter((post) => {
      return post.author === parent.id;
    });
  },
  comments(parent, args, { db }, info) {
    return db.CommentsDatabase.filter((comment) => {
      return comment.author === parent.id;
    });
  },
};
