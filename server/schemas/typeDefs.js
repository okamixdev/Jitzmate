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
        belt: Belt
    }

    type Post {
        _id: ID
        user: User!
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

    type Auth {
        token: ID!
        user: User!
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
        findBelt: Belt
        findAchievements(username: ID!): [Achievements]
        feed: [Post]
    }


    # ---------------------------------------------------------------------------------------------------------
    # MUTATIONS
    type Mutation {
        addUser(first: String!, last: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addPost(texto: String!, files: String!): Post
        removePost(postId: ID!): Post
        addComment(comment: String!, post: ID!): Comment
        removeComment(commentId: ID!): Comment
        addFollow(follows: ID!): Follow
        removeFollow(followId: ID!): Follow
        addLike(post: ID!): Post
        removeLike(postId: ID!): Post
        addBelt(belt: ID!): Belt
        removeBelt(beltId: ID!): Belt
        addAchievement(user: ID!, achievement: String!): Achievements
        removeAchievement(achievementId: ID!): Achievements
    }


`;

// Export the typeDefs
module.exports = typeDefs;