import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
        query launches {
            launches  {
                id
                name
                mission_name
              }
        }
    `;