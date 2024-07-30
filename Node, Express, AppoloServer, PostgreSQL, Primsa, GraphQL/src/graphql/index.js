const { ApolloServer } = require( "@apollo/server");
const User = require("./user");
const { authContext } = require("../middlewares/auth");

async function createAppoloGraphqlServer() {
    const server = new ApolloServer({
        typeDefs: User.typeDefs,
        resolvers: {
            Query: {
              ...User.queries
            },
            Mutation:{
                ...User.mutations
            }
        },
        context: authContext,
      });

    await server.start();
    return server;
}
module.exports = {createAppoloGraphqlServer}