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
  origin: 'http://localhost:3000', // Your client's URL
  credentials: true
};

const server = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
    context: ({ req }) => {
        // You can add any context setup here if needed
        return { req };
    },
    cors: false, // Disable Apollo's CORS, we'll handle it with Express
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

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on localhost:${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
};

startApolloServer();