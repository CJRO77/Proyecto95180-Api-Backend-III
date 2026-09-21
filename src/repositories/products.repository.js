import ProductModel from "../models/product.model.js";

// repositorio de productos

export const productsRepository = {

    getAll: async (filters = {}) => {
        return await ProductModel.find(filters);
    },

    getById: async (id) => {
        return await ProductModel.findById(id);
    },

    create: async (productData) => {
        return await ProductModel.create(productData);
    },

    update: async (id, updateData) => {
        return await ProductModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
    },

    delete: async (id) => {
        return await ProductModel.findByIdAndDelete(id);
    }
};