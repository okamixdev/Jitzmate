// -------------------------------------------------------------
// Dependencies

const jwt = require('jsonwebtoken');

// JWT Configuration
const secret = "THIS_IS_THE-BEST_SECRET-EVER->2023";
const expiration = '2h';

// --------------------------------------------------------------------
// Export the Auth Helper Functions
module.exports = {

    // Auth Middleware
    authMiddleware: function ({ req }) {

        // Allow wthe token to be sent cia req.query or headers.authorization
        let token = req.body.token || req.query.token || req.headers.authorization;

        // Separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) { token = token.split(' ').pop().trim() };

        // If no token, return request object as is
        if (!token) { return req };

        // Verify that the token is valid and not expired and then get data out of token
        try {

            // Verify token and get user data out of it
            const { data } = jwt.verify(token, secret, { maxAge: expiration });

            // Add user data to request object
            req.user = data;

        } catch (err) {
            console.log('Invalid token');
        }

        // Return updated request object
        return req;

    },
    // Sign Token
    signToken: function ({ username, email, _id }) {
        // Assign the params to the payload
        const payload = { username, email, _id };

        // Return the signed token
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
    }
};