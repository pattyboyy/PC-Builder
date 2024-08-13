import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './auth'; // Ensure this path is correct

// Determine the GraphQL endpoint based on the environment
const graphqlEndpoint = import.meta.env.PROD 
  ? '/graphql'  // Production: use relative path (handled by Express)
  : 'http://localhost:3001/graphql';  // Development: full URL

const httpLink = createHttpLink({
  uri: graphqlEndpoint,
});

// Add authentication headers to requests
const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
