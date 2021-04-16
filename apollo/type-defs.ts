import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    me: User!
    feed(input: PaginationInput!): PaginatedPosts!
    sub(name: String!): Sub!
    post(id: ID!): Post!
  }

  type Mutation {
    register(input: RegisterInput!): User!
    login(password: String!, username: String!): User!
    logout: Boolean!
    joinOrLeave(subName: String!): Boolean!
    createPost(input: PostInput!, subName: String!): Post!
    deletePost(postId: ID!): Boolean!
    editPost(input: PostInput!, postId: ID!): Post!
    createComment(postId: ID!, text: String!): Comment!
    deleteComment(commentId: ID!): Boolean!
    createSub(input: SubInput!): Sub!
    editComment(commentId: ID!, text: String!): Comment!
    votePost(postId: ID!, value: Int!): Boolean!
    voteComment(commentId: ID!, value: Int!): Boolean!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    bio: String
    image: String
    posts(input: PaginationInput!): PaginatedPosts!
    comments(input: PaginationInput!): PaginatedComments!
    createdAt: Date!
  }

  type Sub {
    name: ID!
    title: String
    description: String
    image: String
    banner: String
    posts(input: PaginationInput!): PaginatedPosts!
    members: Int!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    comments(input: PaginationInput!): PaginatedComments!
    image: String
    creator: User!
    creatorId: String!
    sub: Sub!
    subName: String!
    voteStatus: Int!
    votes: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type Comment {
    id: ID!
    text: String!
    creator: User!
    creatorId: String!
    post: Post!
    postId: String!
    voteStatus: Int!
    votes: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type PaginatedPosts {
    posts: [Post!]!
    hasMore: Boolean!
  }

  type PaginatedComments {
    comments: [Comment!]!
    hasMore: Boolean!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
  }

  input SubInput {
    name: ID!
    title: String
    description: String
    image: String
    banner: String
  }

  input PostInput {
    title: String!
    body: String!
    image: String
  }

  input PaginationInput {
    take: Int!
    cursor: ID
  }

  scalar Date
`;
