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
                    .populate('user').select('-__v -password -email')
                    .populate('likes');
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
        addUser: async (root, args) => {
            // create user
            const user = await User.create(args);
            const token = signToken(user);
            // return the token and user
            return { token, user };
        },

        login: async (root, { email, password, username }) => {
            // Search user via email or username
            const user = await User.findOne({ email }) || await User.findOne({ username });

            // Check if user exist and the throw auth error
            if (!user) { throw new AuthenticationError("Incorrect Credentials!!") };

            // Check if password is correct
            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) { throw new AuthenticationError("Incorrect Credentials!!") };

            // Signs and return token if password/username/email is corrects
            const token = signToken(user);
            return { token, user };
        },

        addPost: async (root, args, context) => {

            if (context.user) {
                const postData = await Post.create(
                    { user: context.user._id, text: args.texto, file: args.files },
                );
                return postData;
            };
            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        removePost: async (root, { postId }, context) => {
            if (context.user) {
                const postData = await Post.findOneAndDelete({
                    _id: postId
                });
                return postData;
            };
            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        addComment: async (root, args, context) => {
            if (context.user) {
                const commentData = await Comment.create(
                    { user: context.user._id, comment: args.comment, post: args.post }
                );
                return commentData;
            };
            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        removeComment: async (root, { commentId }, context) => {
            if (context.user) {
                const commentData = await Comment.findOneAndDelete({
                    _id: commentId
                });
                return commentData;
            };
            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        addFollow: async (root, args, context) => {
            if (context.user) {
                const followData = await Follow.create(
                    { user: context.user._id, follows: args.follows }
                );
                return followData;
            };
            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        removeFollow: async (root, { followId }, context) => {
            if (context.user) {
                const followData = await Follow.findOneAndDelete({
                    user: context.user._id, follows: followId
                });
                return followData;
            };
            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        addLike: async (root, { post }, context) => {
            if (context.user) {
                const likeData = Post.findOneAndUpdate(
                    { _id: post },
                    { $push: { likes: context.user._id } }
                );
                return likeData;
            };

            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        removeLike: async (root, { postId }, context) => {
            if (context.user) {
                const likeData = Post.findOneAndUpdate(
                    { _id: postId },
                    { $pull: { likes: context.user._id } }
                )
                return likeData;
            };
            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        addBelt: async (root, args, context) => {
            if (context.user) {
                const beltData = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { belt: args.belt }
                )
                return beltData;
            };
            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        removeBelt: async (root, args, context) => {
            if (context.user) {
                const beltData = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { belt: args.beltId } }
                )
                return beltData;
            };
            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        addAchievement: async (root, args, context) => {
            if (context.user) {

            };
            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        removeAchievement: async (root, args, context) => {
            if (context.user) {

            };
            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },
    }
};

// Export the resolvers
module.exports = resolvers;