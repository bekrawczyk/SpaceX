import { gql } from '@apollo/client';

export const GET_ALL_LAUNCHES = gql`
    query getAllLaunches {
        getAllLaunches {
            date_utc
            details 
            flight_number 
            id 
            name 
            success 
            upcoming
        }
    }
`;

export const EDIT_LAUNCH = gql`
    mutation editLaunch(
        # $id: ID!
        $details: String
        $flight_number: Int!
        $name: String!
        $success: Boolean
        $upcoming: Boolean
    ) {
        editLaunch(
            # id: $id
            input: {
                details: $details
                flight_number: $flight_number
                name: $name
                success: $success
                upcoming: $upcoming  
            }
        ) {
            # date_utc
            details
            flight_number
            # id
            name
            success
            upcoming
        }
    }
`;
