const { gql } = require('apollo-server');

const schema = gql`
    type Launch {
        date_utc: String
        details: String
        flight_number: Int!
        _id: ID!
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

    input NewLaunchInput {
        date_utc: String
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
        editLaunch(_id: ID!, input: EditedLaunchInput!): Launch!
        addLaunch(input: NewLaunchInput!): Launch!
    }
`;

module.exports = schema;
