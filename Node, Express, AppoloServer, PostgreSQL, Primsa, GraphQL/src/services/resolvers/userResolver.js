const { prisma } = require("../../lib/database");

const createUser = async (value) => {
    try {
        const user = await prisma.users.create({
          data: {
           ...value,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        });
        if (!user) {
          throw new Error("User not created");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await prisma.users.findFirst({ where: { email } });
      return user;
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const user = await prisma.users.findUnique({
            where: { id }
        });
      
        if (!user) {
            throw new Error("User not found");
        }
      return user;
    } catch (error) {
        throw error;
    }
}

const getAllUsers = async () => {
    try {
        const users = await prisma.users.findMany({});
        return users || [];
    } catch (error) {
        throw error;
    }
}

const updateUserDetails  = async (id, values) => {
    try {
        const updated = await prisma.users.update({
            where: { id },
            data: {
                ...values,
                updatedAt: new Date(),
            }
        });
        if (!updated) {
            throw new Error("User not updated");
        }
        return await getUserById(id);      
    } catch (error) {
        throw error;
    }
}

const deleteUserDetails = async (id) => {
    try {
        const deleted = await prisma.users.delete({ where: { id } });
        if (deleted === 0) {
          throw new Error("User not deleted");
        }
    
        return true;
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser, getUserByEmail, getUserById, getAllUsers, updateUserDetails, deleteUserDetails }
