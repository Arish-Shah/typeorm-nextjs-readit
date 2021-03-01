import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createHttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import theme from "./theme";
import { PaginatedPosts } from "./generated/graphql";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(
            existing: PaginatedPosts | undefined,
            incoming: PaginatedPosts
          ): PaginatedPosts {
            return {
              ...incoming,
              posts: [...(existing?.posts || []), ...incoming.posts],
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({ link, cache, connectToDevTools: true });

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ApolloProvider>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
