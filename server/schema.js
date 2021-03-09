const { gql } = require('apollo-server');

const schema = gql`
    type Launch {
        id: ID!
        name: String
        mission_name: String
    },

    type Query {
        launches: [Launch]!
    },
`;

module.exports = schema;
