const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { gql } = require('graphql-tag');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Configure CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://rig-builderpro.onrender.com'] // Remove the placeholder URL
    : 'http://localhost:3000',
  credentials: true
};

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: ({ req }) => {
    // You can add any context setup here if needed
    return { req };
  },
  formatError: (error) => {
    // Log server-side errors and return a generic error message to the client
    console.error(error);
    return new Error('An error occurred');
  },
});

const startApolloServer = async () => {
  await server.start();

  // Apply CORS middleware to all routes
  app.use(cors(corsOptions));
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Apply CORS and other middleware to the GraphQL endpoint
  app.use('/graphql', 
    cors(corsOptions),
    expressMiddleware(server, {
      context: authMiddleware
    })
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });

  // Handle database connection errors
  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
};

startApolloServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
