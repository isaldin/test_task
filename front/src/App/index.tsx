import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { MainPage } from "../containers";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

export const App = () => (
  <ApolloProvider client={client}>
    <MainPage />
  </ApolloProvider>
);
