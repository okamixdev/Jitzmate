// ------------------------------------------------------------------------------------------------
// Dependencies
const express = require('express');
const db = require('./config/connection')
const path = require('path');

// Import Apollo Server
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas/index');

// APP Configuration
const app = express();
const PORT = process.env.PORT || 3001;

// Create new Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

// ------------------------------------------------------------------------------------------------
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// Serve up static assets (usually on heroku)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build'));
});

// ------------------------------------------------------------------------------------------------
// Setup the Server
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    // Start Express Server
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    });
};

// Start Apollo Server
startApolloServer(typeDefs, resolvers);

