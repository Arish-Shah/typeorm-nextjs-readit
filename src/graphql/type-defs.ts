import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    register(input: RegisterInput!): User!
    login(input: LoginInput!): User!
    logout: Boolean!
    createOrUpdateSub(input: SubInput!): Sub!
    createPost(input: PostInput!, subName: String!): Post!
    updatePost(id: ID!, input: PostInput!): Post!
    deletePost(id: ID!): Boolean!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String
    image: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Sub {
    id: ID!
    name: String!
    title: String
    description: String
    image: String
    banner: String
    createdAt: Date!
  }

  type Post {
    id: ID!
    title: String!
    body: String
    image: String
    link: String
    creator: User
    creatorId: String!
    sub: Sub
    subName: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
  }

  input LoginInput {
    username: String!
    password: String!
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
    body: String
    image: String
    link: String
  }

  scalar Date
`;
