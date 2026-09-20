import { productsRepository } from "../repositories/products.repository.js";
import { PRODUCT_STATUS } from "../constants/index.js";

export const productsService = {

    getAllProducts: async () => {

        const products = await productsRepository.getAll();

        return products.filter((product) => {
            return product.status === PRODUCT_STATUS.AVAILABLE;
        });
    },

    getProductById: async (id) => {

        const product = await productsRepository.getById(id);

        return product;
    },

    createProduct: async (productData) => {

        if (productData.stock === 0) {
            productData.status = PRODUCT_STATUS.OUT_OF_STOCK;
        } else {
            productData.status = PRODUCT_STATUS.AVAILABLE;
        }

        const newProduct = await productsRepository.create(productData);

        return newProduct;
    }
};