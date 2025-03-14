require('dotenv').config({ path: '../.env' });
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const typeDefs = require('./schemas/typedefs');
const resolvers = require('./schemas/resolver');
const cors = require('cors');
const { authMiddleware } = require('./utils/auth');


const app = express();

connectDB()


// Apollo Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => authMiddleware({ req }), // Pass JWT handling to Apollo context
});

async function startServer() {
    await server.start();
    app.use(
        '/graphql',
        cors(), // Enable CORS
        express.json(), // Parse JSON request bodies
        expressMiddleware(server) // Apply Apollo middleware
    );

    // Serve static files in production
    if (process.env.NODE_ENV === 'production') {
        const path = require('path');
        app.use(express.static(path.join(__dirname, '../client/dist')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}/graphql`);
    });
}

startServer();
