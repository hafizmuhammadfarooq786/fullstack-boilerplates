const bcrypt = require('bcrypt');
const User = require('../models/user');

const signup = async (name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!user) {
      throw new Error("User not created");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error("Invalid email or password");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll({});
    return users || [];
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, name) => {
  try {
    const [updated] = await User.update({ name, updatedAt: Date.now }, { where: { id } });
    if (updated === 0) {
      throw new Error("User not updated");
    }

    const updatedUser = await User.findOne({ where: { id } });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const deleted = await User.destroy({ where: { id } });
    if (deleted === 0) {
      throw new Error("User not deleted");
    }

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { signup, login, getUsers, updateUser, deleteUser };
