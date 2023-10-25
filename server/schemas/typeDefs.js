// ----------------------------------------------------------------
// Dependencies

const { gql } = require('apollo-server-express');

const typeDefs = gql`

    # ---------------------------------------------------------------------------------------------------------
    # TYPES
    type User {
        _id: ID
        first: String!
        last: String!
        username: String!
        email: String!
        password: String!
        avatar: String!
        posts: [Post]
        followers: [Follow]
        follows: [Follow]
        achievements: [Achievements]
        belt: [Belt]
    }

    type Post {
        _id: ID
        user: [User]
        text: String!
        file: String!
        likes: [User]
        comments: [Comment]
    }

    type Follow {
        _id: ID
        user: [User]
        follows: [String]!
    }

    type Comment {
        _id: ID
        user: [User]
        comment: String!
        post: [Post]
        likes: [User]
    }

    type Belt {
        _id: ID
        user: [User]
        belt: String!
    }

    type Achievements {
        _id: ID
        user: [User]
        achievement: String!
    }

    # ---------------------------------------------------------------------------------------------------------
    # QUERIES
    type Query {
        me: User
        allPosts: [Post]
        findPosts(username: ID!): [Post]
        findComments(postId: ID!): [Comment]
        findFollowers(username: ID!): [Follow]
        findFollows(username: ID!): [Follow]
        findBelt(username: ID!): [Belt]
        findAchievements(username: ID!): [Achievements]
        feed(user: ID!): [Post]
    }


    # ---------------------------------------------------------------------------------------------------------
    # MUTATIONS
    type Mutation {
        addUser(first: String!, last: String!, username: String!, email: String!, password: String!, avatar: String!): Auth
        login(email: String!, password: String!): Auth
        addPost(user: ID!, text: String!, file: String!): Post
        removePost(postId: ID!): Post
        addComment(user: ID!, comment: String!, post: ID!): Comment
        removeComment(commentId: ID!): Comment
        addFollow(user: ID!, follows: String!): Follow
        removeFollow(followId: ID!): Follow
        addLike(user: ID!, post: ID!): Post
        removeLike(postId: ID!): Post
        addBelt(user: ID!, belt: String!): Belt
        removeBelt(beltId: ID!): Belt
        addAchievement(user: ID!, achievement: String!): Achievements
        removeAchievement(achievementId: ID!): Achievements
    }


`;

// Export the typeDefs
module.exports = typeDefs;