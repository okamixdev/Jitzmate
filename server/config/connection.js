// -----------------------------------------------------------------------
// Dependencies
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/jitzmate_db');
console.log('\nConnection to DB !==Successful==!')

// Export the connection
module.exports = mongoose.connection;