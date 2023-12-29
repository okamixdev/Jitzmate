// ---------------------------------------------------------------
// Import dependencies
const jwt = require('jsonwebtoken');

// JWT Configuration
const secret = "THIS_IS_THE-BEST_SECRET-EVER->2023";
const expiration = '2h';

// AUTH middleware function
const auth = async (req, res, next) => {
    // Check if the auth header comes back
    if (!req.headers.authorization) {
        return res.status(400).send({
            status: 'ERROR',
            message: 'Request does not have an auth header'
        })
    };

    // Clean and decode the token
    const token = await req.headers.authorization.replace(/[' "]+/g, '');
    try {

        // Verify token and get user data out of it
        const { data } = jwt.verify(token, secret, { maxAge: expiration });

        // Add user data to request object
        req.user = data;

    } catch (err) {
        console.log('Invalid token');
        return res.status(404).send({
            status: 'ERROR',
            message: 'Invalid Token'
        })
    };

    // Next controller process.
    await next();
};

module.exports = {
    auth
};