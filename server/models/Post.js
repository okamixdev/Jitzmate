// --------------------------------------------------------------------
// Dependencies

const { Schema, model } = require('mongoose');

// --------------------------------------------------------------------
// Post Schema
const postSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],

},
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// --------------------------------------------------------------------
// Virtuals

// Gets the comments count for the desired post
postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

// Gets the like count for the desired post
postSchema.virtual('likeCount').get(function () {
    return this.likes.length;
});


// --------------------------------------------------------------------
// Creates the post model using the postSchema
const Post = model('Post', postSchema);

// --------------------------------------------------------------------
// Export the User model
module.exports = Post;