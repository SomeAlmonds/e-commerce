import { db } from "../config/db.js";
import validateInput from "../middleware/input_validation_middleware.js";
import ProductsModel from "../models/products_model.js";
import { AppError } from "../utils/error_handler.js";
export default class ProductsController {
    static async getProducts(req, res, next) {
        // validate input
        if (!validateInput(req, res, next)) {
            return;
        }
        //
        const offset = ((Number(req.query.page) || 0) - 1) * 20;
        console.log(offset);
        try {
            const products = await ProductsModel.getAllProducts(20, offset, db);
            if (!products.length) {
                return next(new AppError(404, "No products found"));
            }
            return res.status(200).json({ message: "Success", data: { products } });
        }
        catch (err) {
            next(err);
        }
    }
    static async getProductById(req, res, next) {
        // validate input
        if (!validateInput(req, res, next)) {
            return;
        }
        //
        try {
            const product = await ProductsModel.getProductById(Number(req.params.product_id), db);
            if (!product) {
                return next(new AppError(404, "Product not found"));
            }
            return res.status(200).json({ message: "Success", data: { product } });
        }
        catch (err) {
            next(err);
        }
    }
    static async getFilteredProducts(req, res, next) {
        // validate input
        if (!validateInput(req, res, next)) {
            return;
        }
        //
        const offset = ((Number(req.query.page) || 0) - 1) * 20;
        const { product_name, product_category, product_rating, min_price, max_price, } = req.query;
        try {
            const products = await ProductsModel.getFilteredPorducts({
                product_name,
                product_category,
                product_rating,
                min_price,
                max_price,
            }, offset, 20, db);
            if (!products.length) {
                return next(new AppError(404, "No products found"));
            }
            return res.status(200).json({ message: "Success", data: { products } });
        }
        catch (err) {
            next(err);
        }
    }
}
//# sourceMappingURL=products_controller.js.map