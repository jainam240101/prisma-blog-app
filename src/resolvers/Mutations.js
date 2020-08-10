/** @format */
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { userid } from "../utils/auth";

export const Mutation = {
  async login(parent, { email, password }, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: email,
      },
    });
    const passwordmatch = await bcryptjs.compare(password, user.password);
    if (!passwordmatch || user === null) {
      throw new Error("User Doesnt Exist");
    }
    return {
      user: user,
      token: jwt.sign({ id: user.id }, "mysecret"),
    };
  },

  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error(
        "Password is to short it should be at least 8 characters"
      );
    }
    const hashedpassword = await bcryptjs.hash(args.data.password, 10);
    const emailtaken = await prisma.exists.User({
      email: args.data.email,
    });
    if (emailtaken) {
      throw new Error("Email Is Taken");
    }
    const user = await prisma.mutation.createUser({
      data: {
        name: args.data.name,
        email: args.data.email,
        password: hashedpassword,
      },
    });
    return {
      user: user,
      token: jwt.sign({ id: user.id }, "mysecret"),
    };
  },
  async createPost(parent, { data }, { prisma, request }, info) {
    const authorid = userid(request);
    const refactoreddata = {
      ...data,
      author: {
        connect: {
          id: authorid,
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
  async createComment(parent, args, { prisma, request }, info) {
    const id = userid(request);
    const postexists = await prisma.exists.Post({
      id: args.data.post,
      published: true,
    });
    console.log(postexists);
    if (!postexists) {
      throw new Error("Given Information is Incorrect");
    }
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: id,
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
  async updateComment(parent, { id, text }, { prisma, request }, info) {
    const usersid = userid(request);
    const commentexists = await prisma.exists.Comment({
      id: id,
      author: { id: usersid },
    });
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
  async deleteComment(parent, { id }, { request, prisma }, info) {
    const usersid = userid(request);
    const commentexists = await prisma.exists.Comment({
      id: id,
      author: { id: usersid },
    });
    if (!commentexists) {
      throw new Error("Comment Deosnt Exist");
    }
    return prisma.mutation.deleteComment(
      {
        where: {
          id: id,
        },
      },
      info
    );
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const id = userid(request);
    return prisma.mutation.deleteUser(
      {
        where: {
          id: id,
        },
      },
      info
    );
  },
  async updateUser(parents, { data }, { request, prisma }, info) {
    const id = userid(request);
    const emailtaken = await prisma.exists.User({
      email: data.email,
    });
    if (emailtaken) {
      throw new Error("Email Is Taken");
    }
    return prisma.mutation.updateUser(
      {
        data: { ...data },
        where: { id: id },
      },
      info
    );
  },
  async deletePost(parent, { id }, { prisma, request }, info) {
    const userId = userid(request);
    const postsExists = await prisma.exists.Post({
      id: id,
      author: {
        id: userId,
      },
    });
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
  async updatePost(parent, { id, data }, { request, prisma }, info) {
    const usersId = userid(request);
    const postexists = await prisma.exists.Post({
      id: id,
      author: {
        id: usersId,
      },
    });
    if (!postexists) {
      throw new Error("Post Doesnt Exist ");
    }
    const postpublished = await prisma.exists.Post({
      id: id,
      published: true,
    });
    if (!postpublished) {
      throw new Error("Post Doesnt Exist");
    }
    if (postpublished && data.published === false) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: id,
          },
        },
      });
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
