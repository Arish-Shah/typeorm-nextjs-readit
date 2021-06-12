import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    createOrUpdateSub(input: SubInput!): Sub!
    createPost(input: PostInput!, subName: String!): Post!
    editPost(id: ID!, input: PostInput!): Post!
    deletePost(id: ID!): Boolean!
  }

  type User {
    id: ID!
    name: String
    email: String
    image: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Sub {
    name: ID!
    title: String
    description: String
    image: String
    banner: String
    createdAt: DateTime!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    postType: PostType!
    sub: Sub
    subName: String!
    creator: User
    creatorId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input SubInput {
    name: String!
    title: String
    description: String
    image: String
    banner: String
  }

  input PostInput {
    title: String!
    body: String!
    postType: PostType!
  }

  enum PostType {
    TEXT
    IMAGE
    LINK
  }

  scalar DateTime
`;
