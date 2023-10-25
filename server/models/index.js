// ----------------------------------------------------------------
// Dependencies

// Imports the models individually to then export them as a whole
const Post = require('./Post');
const User = require('./User');
const Achievements = require('./Achievements');
const Belt = require('./Belt');
const Comment = require('./Comment');
const Follow = require('./Follow');


// Exports the models
module.exports = {
    Post,
    User,
    Achievements,
    Belt,
    Comment,
    Follow
}