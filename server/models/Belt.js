// --------------------------------------------------------------------
// Dependencies

const { Schema, model } = require('mongoose');

// --------------------------------------------------------------------
// Belt Schema
const beltSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    belt: {
        type: String,
        required: true
    },

});



// --------------------------------------------------------------------
// Creates the belt model using the beltSchema
const Belt = model('Belt', beltSchema);

// --------------------------------------------------------------------
// Export the User model
module.exports = Belt;