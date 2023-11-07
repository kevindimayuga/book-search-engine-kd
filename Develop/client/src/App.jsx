import './App.css';
import { Outlet } from 'react-router-dom';

// This will import ApolloClient, ApolloProvider, and InMemoryCache from the @apollo/client package.
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Navbar from './components/Navbar';


const client = new ApolloClient({
  // This is the URL of the GraphQL server.
  uri: '/graphql',
  // This is where Apollo Client will cache our data so that we don't have to query the server each time we want to see the data.
  cache: new InMemoryCache(),
});

// wrapped Navbar and Outlet in ApolloProvider component and passed the client variable as the value for the client prop.
// ApolloProvider is a special type of React component that we'll use to provide and data to all of the other components.
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
