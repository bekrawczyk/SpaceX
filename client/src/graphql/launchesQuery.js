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
