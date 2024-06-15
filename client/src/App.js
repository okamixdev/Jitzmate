import { Navbar } from './Components/Navbar';
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { setContext } from 'apollo-link-context';

// --------------------------------------------------------------------------------
// Apollo Setup

const PORT = process.env.PORT || 3001;

// httpLink for Apollo Client
const httpLink = createHttpLink({
  uri: `/graphql`,
});

// authLink dor Apollo Client
const authLink = setContext((_, { headers }) => {
  // Get token from localStorage
  const token = localStorage.getItem('id_token');

  // Return headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Clinet
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // link: new createUploadLink({
  //   uri: 'http://localhost:3000/'
  // }),
  cache: new InMemoryCache(),
});


function App() {

  return (

    <ApolloProvider client={client}>
      <>
        <Navbar />
      </>
    </ApolloProvider>

  );
}

export default App;
