import { usersService } from "../services/users.service.js";

// Controladores de usuarios

export const getUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


export const getUserById = async (req, res) => {
    try {
        const user = await usersService.getUserById(req.params.id);

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


export const createUser = async (req, res) => {
    try {
        const newUser = await usersService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "Usuario creado correctamente",
            data: newUser
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


export const updateUser = async (req, res) => {
    try {
        const updatedUser = await usersService.updateUser(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "Usuario actualizado correctamente",
            data: updatedUser
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteUser = async (req, res) => {
    try {
        await usersService.deleteUser(req.params.id);

        res.status(200).json({
            success: true,
            message: "Usuario eliminado correctamente"
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};