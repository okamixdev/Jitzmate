// --------------------------------------------------------------------
// Dependencies

const { Schema, model } = require('mongoose');

// --------------------------------------------------------------------
// Follow Schema
const followSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    follows: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

});



// --------------------------------------------------------------------
// Creates the follow model using the followSchema
const Follow = model('Follow', followSchema);

// --------------------------------------------------------------------
// Export the User model
module.exports = Follow;