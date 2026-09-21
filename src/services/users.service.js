import bcrypt from "bcryptjs";
import { usersRepository } from "../repositories/users.repository.js";
import { USER_ROLES } from "../constants/index.js";

// Servicio de usuarios

const SALT_ROUNDS = 10;

export const usersService = {

    getAllUsers: async () => {
        return await usersRepository.getAll();
    },

    getUserById: async (id) => {
        const user = await usersRepository.getById(id);

        if (!user) {
            const error = new Error("Usuario no encontrado");
            error.statusCode = 404;
            throw error;
        }

        return user;
    },

    createUser: async (userData) => {
        const { firstName, lastName, email, password } = userData;

        if (!firstName || !lastName || !email || !password) {
            const error = new Error("firstName, lastName, email y password son obligatorios");
            error.statusCode = 400;
            throw error;
        }

        const existingUser = await usersRepository.getByEmail(email);

        if (existingUser) {
            const error = new Error("Ya existe un usuario registrado con ese email");
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // nadie se autoasigna ADMIN al registrarse

        const newUser = await usersRepository.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: USER_ROLES.USER
        });

        newUser.password = undefined;

        return newUser;
    },

    updateUser: async (id, updateData) => {
        await usersService.getUserById(id); 

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
        }

        return await usersRepository.update(id, updateData);
    },

    deleteUser: async (id) => {
        await usersService.getUserById(id); 

        return await usersRepository.delete(id);
    }
};