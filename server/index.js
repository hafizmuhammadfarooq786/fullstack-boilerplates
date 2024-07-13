const express = require("express");
const { ApolloServer } = require( "@apollo/server");
const { expressMiddleware } = require( "@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require('cors');
const { dbConnection } = require('./models');
const { getUsers, signup, login, updateUser, deleteUser  } = require("./controllers/userController");
const { generateToken, authContext } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { responseHandler } = require('./middlewares/responseHandler');

async function init() {
  const app = express();
  const PORT = 8000;

  app.use(bodyParser.json());
  app.use(responseHandler);
  app.use(cors());
  dbConnection();

  // GraphQL Server
  const server = new ApolloServer({
    typeDefs: `
        type Query {
          getUsers: [User]
        }
        type Mutation {
          signup(name: String!, email: String!, password: String!): User
          login(email: String!, password: String!): AuthPayload
          updateUser(id: ID!, name: String!): User
          deleteUser(id: ID!): Boolean
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
      `,
    resolvers: {
      Query: {
        getUsers: async (_, __, { user }) => {
          try {
            if (!user) {
              throw new Error('Unauthorized. Please login.');
            }
            const users = await getUsers();
            return users;
          } catch (error) {
            throw new Error(error.message);
          }
        },
      },
      Mutation: {
        signup: async (_, { name, email, password }) => {
          try {
            const user = await signup(name, email, password);
            return user;
          } catch (error) {
            throw new Error(error.message);
          }
        },
        login: async (_, { email, password }) => {
          try {
            const user = await login(email, password);
            const token = await generateToken(user);
            return { token, user };
          } catch (error) {
            throw new Error(error.message);
          }
        },
        updateUser: async (_, { id, name }, { user }) => {
          try {
            if (!user) {
              throw new Error('Unauthorized. Please login.');
            }
            const updatedUser = await updateUser(id, name);
            return updatedUser;
          } catch (error) {
            throw new Error(error.message);
          }
        },
        deleteUser: async (_, { id }, { user }) => {
          try {
            if (!user) {
              throw new Error('Unauthorized. Please login.');
            }
            await deleteUser(id);
            return true;
          } catch (error) {
            throw new Error(error.message);
          }
        },
      },
    },
    context: authContext,
  });

  await server.start();
  
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
        const user = await authContext({ req });
        return user;
    }
  }));
  
  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.use(errorHandler);
  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

init();
