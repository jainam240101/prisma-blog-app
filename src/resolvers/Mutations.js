/** @format */
import { v4 as uuidv4 } from "uuid";
export const Mutation = {
  createUser(parent, args, { db }, info) {
    const takenemail = db.Users.some((user) => {
      return user.email === args.data.email;
    });
    if (takenemail) {
      throw new Error("Email Already Taken");
    }
    const User = {
      id: uuidv4(),
      ...args.data,
    };
    db.Users.push(User);
    return User;
  },
  createPost(parent, args, { db,pubsub }, info) {
    const userexists = db.Users.some((user) => {
      return Number(user.id) === Number(args.data.author);
    });
    if (userexists) {
      const data = {
        id: uuidv4(),
        ...args.data,
      };
      db.PostsDatabase.push(data);
      pubsub.publish(`allposts`, {
        post:data
      });
      return data;
    } else {
      throw new Error("User Doesnt Exist");
    }
  },
  createComment(parent, args, { db,pubsub }, info) {
    const userexists = db.Users.some((user) => {
      return Number(user.id) === Number(args.data.author);
    });
    const postexist = db.PostsDatabase.some((post) => {
      return Number(post.id) === Number(args.data.post);
    });
    if (userexists && postexist) {
      const data = {
        id: uuidv4(),
        ...args.data,
      };
      db.CommentsDatabase.push(data);
      pubsub.publish(`comment ${args.data.post}`, {
        comment:data
      })

      return data;
    } else {
      throw new Error("User or Post Id is incorrect");
    }
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.Users.findIndex((user) => {
      return user.id === args.id;
    });
    if (userIndex === -1) {
      throw new Error("No User Found");
    }
    const deletedUsers = db.Users.splice(userIndex, 1);

    posts = db.PostsDatabase.filter((post) => {
      const match = post.author === args.id;

      if (match) {
        comments = db.CommentsDatabase.filter(
          (comment) => comment.post !== post.id
        );
      }
      return !match;
    });
    comments = db.CommentsDatabase.filter(
      (comment) => comment.author !== args.id
    );
    return deletedUsers[0];
  },
  updateUser(parents, { id, data }, { db }, info) {
    const User = db.Users.find((user) => {
      return Number(user.id) === Number(id);
    });
    if (!User) {
      throw new Error("User doesnt exist");
    }
    if (typeof data.email === "string") {
      const emailtaken = db.Users.some((user) => user.email === data.email);
      if (emailtaken) {
        throw new Error("Email Taken");
      }
      User.email = data.email;
    }
    User.name = data.name;
    User.age = data.age;
    return User;
  },
  updatePost(parent, { id, data }, { db }, info) {
    console.log(data);
    const Post = db.PostsDatabase.find((post) => {
      return Number(post.id) === Number(id);
    });
    console.log(Post)
    Post.title = data.title;
    Post.body = data.body;
    Post.published = data.published;
    return Post;
  },
};
