// -----------------------------------------------------------------------
// Dependencies
const mongoose = require('mongoose');

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const uri = process.env.MONGODB_URI
    || 'mongodb://127.0.0.1/jitzmate_db';

// Connect to MongoDB
mongoose.connect(uri, connectionParams);
console.log('\nConnection to DB !==Successful==!')

// Export the connection
module.exports = mongoose.connection;

// //'mongodb://127.0.0.1/jitzmate_db'


// const database = module.exports = () => {
//     const connectionParams = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }

//     try {
//         mongoose.connect(uri);
//         console.log('\nConnection to DB !==Successful==!');
//     } catch (err) {
//         console.log(err);
//     }
// }

// module.exports(database);