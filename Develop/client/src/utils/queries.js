// This will import gql from the apollo/client package
import { gql } from '@apollo/client';

// This query will get the user's data and the data for the saved books belonging to the user
export const GET_ME = gql`
    query me {
        me {
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