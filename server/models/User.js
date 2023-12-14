// --------------------------------------------------------------------
// Dependencies

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// --------------------------------------------------------------------
// User Schema
const userSchema = new Schema({

    first: {
        type: String,
        required: true,
        trim: true,
    },
    last: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+/, 'Must match an email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    avatar: {
        type: String,
        default: 'https://i.imgur.com/2WZtvrC.png',
    },
    follows: [{
        type: Schema.Types.ObjectId,
        ref: 'Follow'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'Follow'
    }],
    achievements: {
        type: Schema.Types.ObjectId,
        ref: 'Achievements'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    belt: {
        type: Schema.Types.ObjectId,
        ref: 'Belt'
    },

},
    {
        toJSON: {
            virtuals: true,
        },

    }
);


// --------------------------------------------------------------------
// Encrypts the password before saving the user to the database
userSchema.pre('save', async function (next) {
    try {
        if (this.isNew || this.isModified('password')) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
        next();
    }
    catch (err) {
        next(err);
    }
});

// --------------------------------------------------------------------
// Virtual <-> Methods

// Method for the model to validate the password when logged in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Method for the model to validate the password when logged in
userSchema.methods.showFollows = function () {
    return this.follows;
};

// Method to get the user's full name
userSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`;
});

// When we query a user, we'll also get another field called `follows` with the number of follows we have.
userSchema.virtual('followsCount').get(function () {
    return this.follows.length;
});

// When we query a user, we'll also get another field called `followers` with the number of followers we have.
userSchema.virtual('followersCount').get(function () {
    return this.followers.length;
});

// --------------------------------------------------------------------
// Creates the user model using the UserSchema
const User = model('User', userSchema);

// --------------------------------------------------------------------
// Export the User model
module.exports = User;