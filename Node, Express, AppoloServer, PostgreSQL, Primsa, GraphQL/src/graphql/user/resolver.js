const { signup, login, getUsers, updateUser, deleteUser } = require("../../services/controllers/userController");
const { generateToken } = require("../../middlewares/auth");
const queries = {
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
}

const mutations = {
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
}

module.exports = {queries, mutations}