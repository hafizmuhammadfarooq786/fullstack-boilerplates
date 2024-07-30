const bcrypt = require('bcrypt');
const {createUser, getUserByEmail, getAllUsers, getUserById,  updateUserDetails, deleteUserDetails} = require("../resolvers/userResolver");

// User Signup
const signup = async (name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    if (!user) {
      throw new Error("User not created");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

// User Login
const login = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error("Invalid email or password");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

// Get Users
const getUsers = async () => {
  try {
    const users = await getAllUsers();
    return users || [];
  } catch (error) {
    throw error;
  }
};

// Update User
const updateUser = async (id, name) => {
  try {
    const user = await getUserById(id);

    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = await updateUserDetails(id,{
      name,
      updatedAt: new Date(),
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Delete User
const deleteUser = async (id) => {
  try {
    await deleteUserDetails(id);
  } catch (error) {
    throw error;
  }
};

module.exports = { signup, login, getUsers, updateUser, deleteUser };
