const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { gql } = require('graphql-tag');

const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors'); // Add this line

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
});

const startApolloServer = async () => {
    await server.start();

    app.use(cors()); // Add this line to enable CORS for all routes
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', cors(), expressMiddleware(server, {context: authMiddleware})); // Add cors() here too

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