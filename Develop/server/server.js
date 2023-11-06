// Import express, apollo server, express middleware and path dependencies
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

// Added authMiddleware for authentication of the user
const { authMiddleware } = require('./utils/auth');

// Import typeDefs and resolvers and connection from connection.js
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Create new Apollo server and pass in typeDefs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create function to start Apollo server
const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // This will be the middleware that integrates Apollo server with Express and
  // allows us to serve GraphQL queries at the /graphql endpoint
  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
  }
  
  // This will get the index.html file in the dist directory and serve it to the client
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
  
  // app.use(routes);
  
  // This will start the Apollo server and listen for requests
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call function to start Apollo server
startApolloServer();