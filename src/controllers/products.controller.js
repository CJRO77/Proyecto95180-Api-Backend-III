import { productsService } from "../services/products.service.js";

export const getProducts = async (req, res) => {
    try {
        const products = await productsService.getAllProducts();

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: error.message
        });
    }
};


export const getProductById = async (req, res) => {
    try {
        const product = await productsService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el producto",
            error: error.message
        });
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
        res.status(500).json({
            success: false,
            message: "Error al crear el producto",
            error: error.message
        });
    }
};