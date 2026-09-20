import ProductModel from "../models/product.model.js";
import { PRODUCT_STATUS } from "../constants/index.js";

export const productsRepository = {

    getAll: async () => {
        return await ProductModel.find({
            status: PRODUCT_STATUS.AVAILABLE
        });
    },

    getById: async (id) => {
        return await ProductModel.findById(id);
    },

    create: async (productData) => {
        return await ProductModel.create(productData);
    }
};