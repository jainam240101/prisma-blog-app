/** @format */

const Users = [
  {
    id: 1,
    name: "Jainam Mehta",
    email: "jainam@jtech.com",
    age: 19,
  },
  {
    id: 2,
    name: "Dhairya Mehta",
    email: "dhairya@jtech.com",
    age: 11,
  },
  {
    id: 3,
    name: "Richard Hendriks",
    email: "richard@jtech.com",
    age: 19,
  },
];

const PostsDatabase = [
  {
    id: 1,
    title: "GraphQl 101",
    body: "THis is how to use Graphql",
    published: true,
    author: 1,
  },
  {
    id: 2,
    title: "GraphQl V1",
    body: "THis is how to use Graphql in Yoga",
    published: true,
    author: 2,
  },
  {
    id: 3,
    title: "GraphQl Yoga",
    body: "This is how to use Graphql-Apollo",
    published: true,
    author: 1,
  },
];

const CommentsDatabase = [
  {
    id: 1,
    text: "This is Comment 1",
    author: 1,
    post: 1,
  },
  {
    id: 2,
    text: "This is Comment 2",
    author: 2,
    post: 3,
  },
  {
    id: 3,
    text: "This is Comment 3",
    author: 3,
    post: 2,
  },
  {
    id: 4,
    text: "This is Comment 4",
    author: 1,
    post: 1,
  },
];

const db = {
  Users,
  PostsDatabase,
  CommentsDatabase,
};

export { db as default };
