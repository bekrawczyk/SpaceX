import { gql } from '@apollo/client';

export const GET_ALL_LAUNCHES = gql`
    query getAllLaunches {
        getAllLaunches {
            ...basicInformation
        }
    },

    fragment basicInformation on Launch {
        date_utc
        details 
        flight_number 
        _id 
        name 
        success 
        upcoming
    }
`;




export const EDIT_LAUNCH = gql`
    mutation editLaunch($_id: ID!, $input: EditedLaunchInput!) {
        editLaunch(
            _id: $_id
            input: $input
        ) {
            date_utc
            details
            flight_number
            _id
            name
            success
            upcoming
        }
    }
`;

export const ADD_LAUNCH = gql`
    mutation addLaunch($input: NewLaunchInput!) {
        addLaunch(
            input: $input
        ) {
            date_utc
            details
            flight_number
            _id
            name
            success
            upcoming
        }
    }
`;
