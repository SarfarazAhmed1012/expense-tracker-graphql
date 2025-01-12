import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        transactions {
            _id
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`

export const GET_TRANSCTION = gql`
    query GetTransaction($id: ID!) {
        transaction(transactionId: $id){
            _id
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`