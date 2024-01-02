// ------------------------------------------------------------------------------------------------
// Dependencies
const express = require('express');
const db = require('./config/connection')
const path = require('path');
const routes = require('./routes');
const cors = require('cors')
const bodyParser = require("body-parser");

// Import Apollo Server
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas/index');

// / 
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};

// APP Configuration
const app = express();
const PORT = process.env.PORT || 3001;

app.use(allowCrossDomain);

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

// CORS Configuration
app.use(cors());
app.use(bodyParser.json());

// Use the routes
app.use(routes);

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

