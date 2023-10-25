// ----------------------------------------------------------------
// Dependencies

const { AuthenticationError } = require('apollo-server-express');
const { Post, User, Achievements, Belt, Comment, Follow } = require('../models/index');
const { signToken } = require('../utils/auth');

// ----------------------------------------------------------------
// Resolvers for the typeDefs
const resolvers = {


    Query: {
        me: async (root, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('posts')
                    .populate('followers')
                    .populate('follows')
                    .populate('achievements')
                    .populate('belt');

                // Return the user data and take out the password and __v fields.
                return userData;
            };
            // Throws new error if you are not logged in.
            throw new AuthenticationError('You need to be logged in in order to get access!')
        },

        allPosts: async (root, args, context) => {
            if (context.user) {
                return await Post.find({})
                    .select('-__v')
                    .populate('user').select('-__v -password')
                    .populate('comments')
                    .populate('likes')
                    .populate('file')
                    .populate('text')
            }
            // Throws new error if you are not logged in.
            throw new AuthenticationError('You need to be logged in in order to get access!')
        },

        findPosts: async (root, args, context) => {
            if (context.user) {
                return await Post.findOne({ user: args._id })
                    .populate('user').select('-__v -password')
                    .populate('comments')
                    .populate('likes')
                    .populate('file')
                    .populate('text')
            }
            // Throws new error if you are not logged in.
            throw new AuthenticationError('You need to be logged in in order to get access!')
        },

        findComments: async (root, args, context) => {
            if (context.user) {
                return await Comment.findOne({ _id: args.postId })
                    .populate('user').select('-__v -password')
                    .populate('post')
                    .populate('comment')
            }
            // Throws new error if you are not logged in.
            throw new AuthenticationError('You need to be logged in in order to get access!')
        },

        findFollowers: async (root, args, context) => {
            if (context.user) {
                return await Follow.find({ follows: { $in: args.username } })
            }
            // Throws new error if you are not logged in.
            throw new AuthenticationError('You need to be logged in in order to get access!')
        },

        findFollows: async (root, args, context) => {
            if (context.user) {
                return await Follow.find({ user: { $in: args.username } })
            }
            // Throws new error if you are not logged in.
            throw new AuthenticationError('You need to be logged in in order to get access!')
        },

        findBelt: async (root, args, context) => {
            if (context.user) {
                return await User.findOne({ user: args.username })
                    .populate('belt')
            }
            // Throws new error if you are not logged in.
            throw new AuthenticationError('You need to be logged in in order to get access!')
        },

        findAchievements: async (root, args, context) => {
            if (context.user) {
                return await User.findOne({ user: args.username })
                    .populate('achievements')
            }
            // Throws new error if you are not logged in.
            throw new AuthenticationError('You need to be logged in in order to get access!')
        },

        feed: async (root, args, context) => {
            if (context.user) {
                return await Post.find({ user: { $in: context.user.follows } })
                    .populate('user').select('-__v -password')
                    .populate('comments')
                    .populate('likes')
                    .populate('file')
                    .populate('text')
            }
            // Throws new error if you are not logged in.
            throw new AuthenticationError('You need to be logged in in order to get access!')
        }
    },

    Mutation: {






    }

};

// Export the resolvers
module.exports = resolvers;