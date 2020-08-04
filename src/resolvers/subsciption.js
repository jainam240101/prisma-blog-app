/** @format */

export const Subscription = {
  comment: {
    subscribe(parent, { id }, { db, pubsub }, info) {
      const Post = db.PostsDatabase.find(
        (post) => Number(post.id) === Number(id) && post.published
      );
      if (!Post) {
        throw new Error("Post Not Found");
      }
      return pubsub.asyncIterator(`comment ${id}`);
    },
  },
  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator(`allposts`);
    },
  },
};
