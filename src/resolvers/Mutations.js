/** @format */
import { v4 as uuidv4 } from "uuid";
export const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailtaken = await prisma.exists.User({ email: args.data.email });
    if (emailtaken) {
      throw new Error("Email Is Taken");
    }
    return prisma.mutation.createUser({ data: args.data }, info);
  },
  async createPost(parent, { data, author }, { prisma }, info) {
    const userexists = await prisma.exists.User({ id: author });
    if (!userexists) {
      throw new Error("User Doesnt Exists");
    }
    const refactoreddata = {
      ...data,
      author: {
        connect: {
          id: author,
        },
      },
    };
    return prisma.mutation.createPost(
      {
        data: refactoreddata,
      },
      info
    );
  },
  async createComment(parent, args, { prisma }, info) {
    const userexists = await prisma.exists.User({ id: args.data.author });
    const postexists = await prisma.exists.Post({ id: args.data.post });
    if (!userexists || !postexists) {
      throw new Error("Given Information is Incorrect");
    }
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info
    );
  },
  async updateComment(parent, { id, text }, { prisma }, info) {
    const commentexists = await prisma.exists.Comment({ id: id });
    if (!commentexists) {
      throw new Error("Comment Deosnt Exist");
    }
    return prisma.mutation.updateComment(
      {
        data: {
          text: text,
        },
        where: {
          id: id,
        },
      },
      info
    );
  },
  async deleteComment(parent, { id }, { prisma }, info) {
    const commentexists = await prisma.exists.Comment({ id: id });
    if (!commentexists) {
      throw new Error("Comment Deosnt Exist");
    }
    return prisma.mutation.deleteComment(
      {
        where: {
          id:id
        },
      },
      info
    );
  },
  async deleteUser(parent, { id }, { prisma }, info) {
    const idexists = await prisma.exists.User({ id: id });
    if (!idexists) {
      throw new Error("User Does Not Exists");
    }
    return prisma.mutation.deleteUser(
      {
        where: {
          id: id,
        },
      },
      info
    );
  },
  async updateUser(parents, { id, data }, { db, prisma }, info) {
    const userexists = await prisma.exists.User({ id: id });
    const emailtaken = await prisma.exists.User({ email: args.data.email });
    if (emailtaken) {
      throw new Error("Email Is Taken");
    }
    if (!userexists) {
      throw new Error("User Doesnt Exist");
    }
    return prisma.mutation.updateUser(
      {
        data: { ...data },
        where: { id: id },
      },
      info
    );
  },
  async deletePost(parent, { id }, { prisma }, info) {
    const postsExists = await prisma.exists.Post({ id: id });
    if (!postsExists) {
      throw new Error("Post Doesnt Exist");
    }
    return prisma.mutation.deletePost(
      {
        where: {
          id: id,
        },
      },
      info
    );
  },
  async updatePost(parent, { id, data }, { db, prisma }, info) {
    const postexists = await prisma.exists.Post({ id: id });
    if (!postexists) {
      throw new Error("Post Doesnt Exist ");
    }
    return prisma.mutation.updatePost(
      {
        data: {
          ...data,
        },
        where: {
          id: id,
        },
      },
      info
    );
  },
};
