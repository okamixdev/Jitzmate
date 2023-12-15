import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    user {
        _id
        first
        last
    }  
    token
    }
    }
`;

// export const ADD_USER = gql`

// `;

export const ADD_POST = gql`
    mutation AddPost($texto: String!, $files: String!) {
    addPost(texto: $texto, files: $files) {
        _id
    }
    }
`;

export const REMOVE_POST = gql`
    mutation RemovePost($postId: ID!) {
    removePost(postId: $postId) {
        _id
    }
    }
`;

export const ADD_COMMENT = gql`
    mutation AddComment($comment: String!, $post: ID!) {
    addComment(comment: $comment, post: $post) {
        _id
    }
    }
`;

export const REMOVE_COMMENT = gql`
    mutation RemoveComment($commentId: ID!) {
    removeComment(commentId: $commentId) {
        _id
    }
    }
`;

export const ADD_FOLLOW = gql`
    mutation AddFollow($follows: ID!) {
    addFollow(follows: $follows) {
        _id
    }
    }
`;

export const REMOVE_FOLLOW = gql`
    mutation RemoveFollow($followId: ID!) {
    removeFollow(followId: $followId) {
        _id
    }
    }
`;

export const ADD_LIKE = gql`
    mutation AddLike($post: ID!) {
    addLike(post: $post) {
        _id
    }
    }
`;

export const REMOVE_LIKE = gql`
    mutation RemoveLike($postId: ID!) {
    removeLike(postId: $postId) {
        _id
    }
    }
`;

export const ADD_BELT = gql`
    mutation AddBelt($belt: ID!) {
    addBelt(belt: $belt) {
        _id
    }
    }
`;

export const REMOVE_BELT = gql`
    mutation RemoveBelt($beltId: ID!) {
    removeBelt(beltId: $beltId) {
        _id  
    }
    }
`;
