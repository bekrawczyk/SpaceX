const { gql } = require('apollo-server');

const schema = gql`
    type Launch {
        date_utc: String!
        details: String
        flight_number: Int!
        id: String!
        name: String!
        success: Boolean
        upcoming: Boolean!
    },

    type Query {
        getAllLaunches: [Launch]!
    },
`;

module.exports = schema;
