import './App.css';
import { Outlet } from 'react-router-dom';

// This will import ApolloClient, ApolloProvider, and InMemoryCache from the @apollo/client package.
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
