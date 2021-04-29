import { ApolloServer, gql } from "apollo-server-micro";

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      hi: String!
    }
  `,
  resolvers: {
    Query: {
      hi: () => "hey!",
    },
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
