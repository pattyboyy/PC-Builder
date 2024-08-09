import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql', // This will use the Vite proxy
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${Auth.getToken()}`,
  },
});

export default client;