import { productsRepository } from "../repositories/products.repository.js";
import { PRODUCT_STATUS } from "../constants/index.js";

// servicio de productos

export const productsService = {

    getAllProducts: async () => {
        return await productsRepository.getAll({ status: PRODUCT_STATUS.AVAILABLE });
    },

    getProductById: async (id) => {
        const product = await productsRepository.getById(id);

        if (!product) {
            const error = new Error("Producto no encontrado");
            error.statusCode = 404;
            throw error;
        }

        return product;
    },

    createProduct: async (productData) => {
        const { name, price, stock } = productData;

        if (!name || price === undefined || stock === undefined) {
            const error = new Error("name, price y stock son obligatorios");
            error.statusCode = 400;
            throw error;
        }

        if (price < 0 || stock < 0) {
            const error = new Error("price y stock no pueden ser negativos");
            error.statusCode = 400;
            throw error;
        }

        productData.status = stock === 0 ? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.AVAILABLE;

        return await productsRepository.create(productData);
    },

    updateProduct: async (id, updateData) => {
        await productsService.getProductById(id); 

        if (updateData.stock !== undefined) {
            updateData.status = updateData.stock === 0
                ? PRODUCT_STATUS.OUT_OF_STOCK
                : PRODUCT_STATUS.AVAILABLE;
        }

        return await productsRepository.update(id, updateData);
    },

    deleteProduct: async (id) => {
        await productsService.getProductById(id); 

        return await productsRepository.delete(id);
    }
};