// // --------------------------------------------------------------------
// // Dependencies

// const { Schema, model } = require('mongoose');

// // --------------------------------------------------------------------
// // Likes Schema
// const likesSchema = new Schema({

//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     post: {
//         type: Schema.Types.ObjectId,
//         ref: 'Post'
//     },


// },
//     {
//         toJSON: {
//             virtuals: true,
//         },
//     }
// );



// // --------------------------------------------------------------------
// // Creates the user model using the UserSchema
// const Likes = model('Likes', likesSchema);

// // --------------------------------------------------------------------
// // Export the User model
// module.exports = Likes;