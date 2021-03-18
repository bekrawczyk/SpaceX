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
    mutation editLaunch($id: ID!, $input: EditedLaunchInput!) {
        editLaunch(
            id: $id
            input: $input
        ) {
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
