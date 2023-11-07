import './App.css';
import { Outlet } from 'react-router-dom';

// This will import ApolloClient, ApolloProvider, and InMemoryCache from the @apollo/client package
// Adding createHttpLink so that we can connect to the GraphQL API server
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';

import Navbar from './components/Navbar';
import auth from './utils/auth';

// This will configure the main GraphQL endpoint for Apollo Client to use
// The uri is the path to our GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

// create request middleware that will attach the JWT token
// to every request as an authorization header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: auth.authMiddleware.concat(httpLink),
  // This is where Apollo Client will cache our data so that we don't have to query the server each time we want to see the data
  cache: new InMemoryCache(),
});

// wrapped Navbar and Outlet in ApolloProvider component and passed the client variable as the value for the client prop
// ApolloProvider is a special type of React component that we'll use to provide and data to all of the other components
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
