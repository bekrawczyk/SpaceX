const { gql } = require('apollo-server');

const schema = gql`
    type Launch {
        id: ID!
        name: String!
        details: String!
    },

    type Query {
        launches: [Launch]!
    },
`;

module.exports = schema;
