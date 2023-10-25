// --------------------------------------------------------------------
// Dependencies

const { Schema, model } = require('mongoose');

// --------------------------------------------------------------------
// Achievements Schema
const achievementsSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    achievement: {
        type: String,
        required: true
    },

});



// --------------------------------------------------------------------
// Creates the user achievements using the achievementsSchema
const Achievements = model('Achievements', achievementsSchema);

// --------------------------------------------------------------------
// Export the User model
module.exports = Achievements;