// --------------------------------------------------------------------
// Dependencies

const { Schema, model } = require('mongoose');

// --------------------------------------------------------------------
// Comment Schema
const commentSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    likes: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});



// --------------------------------------------------------------------
// Creates the comment model using the commentSchema
const Comment = model('Comment', commentSchema);

// --------------------------------------------------------------------
// Export the User model
module.exports = Comment;