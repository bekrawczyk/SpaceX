const { gql } = require('apollo-server');

const schema = gql`
    type Launch {
        id: String!
        name: String!
        details: String
    },

    type Query {
        getAllLaunches: [Launch]!
    },
`;

module.exports = schema;
