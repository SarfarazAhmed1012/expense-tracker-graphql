import { gql, useQuery } from '@apollo/client';

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const GET_USER_TRANSACTIONS = gql`
query GetUserTransactions($userId: ID!){
  user(userId: $userId){
    _id
    username
    name
    transactions{
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
}
`