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

`;

export const FIND_COMMENT = gql`

`;

export const FIND_FOLLOWERS = gql`

`;

export const FIND_FOLLOWS = gql`

`;

export const FIND_BELT = gql`

`;

export const FIND_ACHIEVEMENTS = gql`

`;

export const FEED = gql`

`;


