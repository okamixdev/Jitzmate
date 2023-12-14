import { gql } from 'graphql-tag';

export const QUERY_ME = gql`
    query Me {
    me {
        avatar
        username
        first
        last
        posts {
        _id
        text
        }
        follows {
        _id
        }
        followers {
        _id
        }
    }
    }
`;

export const FIND_POST = gql`
    query FindPosts($username: ID!) {
    findPosts(username: $username) {
        _id
        file
        text
        user {
        _id
        username
        }
        likes {
        _id
        username
        }
    }
    }
`;

export const FIND_COMMENT = gql`
    query FindComments($postId: ID!) {
    findComments(postId: $postId) {
        _id
        comment
        likes {
        _id
        }
    }
    }
`;

export const FIND_FOLLOWERS = gql`
    query FindFollowers($username: ID!) {
    findFollowers(username: $username) {
        _id
    }
    }
`;

export const FIND_FOLLOWS = gql`
    query FindFollows($username: ID!) {
    findFollows(username: $username) {
        _id
    }
    }
`;

export const FIND_BELT = gql`
    query FindBelt {
    findBelt {
        _id
        belt
    }
    }
`;

export const FIND_ACHIEVEMENTS = gql`

`;

export const FEED = gql`
    query Feed {
    feed {
        _id
        file
        text
        comments {
        _id
        comment
        }
        likes {
        _id
        }
    }
    }
`;


