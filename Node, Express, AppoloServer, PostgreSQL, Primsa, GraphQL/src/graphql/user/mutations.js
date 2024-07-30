const mutations = `
    signup(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthPayload
    updateUser(id: ID!, name: String!): User
    deleteUser(id: ID!): Boolean
`

module.exports = { mutations }