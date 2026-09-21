import UserModel from "../models/user.model.js";

// Repositorio de usuarios

export const usersRepository = {

    getAll: async () => {
        return await UserModel.find();
    },

    getById: async (id) => {
        return await UserModel.findById(id);
    },

    getByEmail: async (email) => {
        return await UserModel.findOne({ email });
    },

    create: async (userData) => {
        return await UserModel.create(userData);
    },

    update: async (id, updateData) => {
        return await UserModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
    },

    delete: async (id) => {
        return await UserModel.findByIdAndDelete(id);
    }
};
