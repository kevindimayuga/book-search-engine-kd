// This will import gql from the apollo/client package
import { gql } from '@apollo/client';

// mutations so that users can login, create an account, save books, and remove books
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: BookInput!) {
        saveBook(input: $input){
            _id
            username
            email
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId){
            _id
            username
            email
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
`;