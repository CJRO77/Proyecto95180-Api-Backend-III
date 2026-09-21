import { productsService } from "../services/products.service.js";


// controlador de productos

export const getProducts = async (req, res) => {
    try {
        const products = await productsService.getAllProducts();

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};


export const getProductById = async (req, res) => {
    try {
        const product = await productsService.getProductById(req.params.id);

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};


export const createProduct = async (req, res) => {
    try {
        const newProduct = await productsService.createProduct(req.body);

        res.status(201).json({
            success: true,
            message: "Producto creado correctamente",
            data: newProduct
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productsService.updateProduct(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "Producto actualizado correctamente",
            data: updatedProduct
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        await productsService.deleteProduct(req.params.id);

        res.status(200).json({
            success: true,
            message: "Producto eliminado correctamente"
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};