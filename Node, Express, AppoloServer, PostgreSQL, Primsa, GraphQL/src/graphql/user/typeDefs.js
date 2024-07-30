const {queries} = require("./queries");
const {mutations} = require("./mutations");

const typeDefs = `
    type Query {
        ${queries}
    }
    type Mutation {
        ${mutations}
    }
    type User {
        id: ID!
        name: String
        email: String!
    }
    type AuthPayload {
        token: String!
        user: User!
    }
`

module.exports = {typeDefs}
