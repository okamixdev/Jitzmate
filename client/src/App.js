import { Navbar } from './Components/Navbar';
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from 'apollo-link-context';

// --------------------------------------------------------------------------------
// Apollo Setup

// httpLink for Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql',
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
