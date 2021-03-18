const { gql } = require('apollo-server');

const schema = gql`
    type Launch {
        date_utc: String
        details: String
        flight_number: Int!
        id: ID!
        name: String!
        success: Boolean
        upcoming: Boolean!
    },

    input EditedLaunchInput {
        details: String
        flight_number: Int!
        name: String!
        success: Boolean
        upcoming: Boolean
    }

    type Query {
        getAllLaunches: [Launch]!
    },

    type Mutation {
        editLaunch(id: ID!, input: EditedLaunchInput!): Launch!
    }
`;

module.exports = schema;
