import { validateInput } from "../middleware/input_validation_middleware.js";
import ProductModel from "../models/products_model.js";
import { db } from "../config/db.js";
import { AppError } from "../utils/error_handler.js";
export default class ProductController {
    static async getProducts(req, res, next) {
        // validate input
        if (!validateInput(req, res, next)) {
            return;
        }
        //
        const offset = Number(req.query.page) * 20;
        try {
            const products = await ProductModel.getAllProducts(20, offset, db);
            if (!products) {
                next(new AppError(404, "No product found"));
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
            const product = await ProductModel.getProductById(Number(req.params.product_id), db);
            if (!product) {
                return next(new AppError(404, "Product not found"));
            }
            return res.status(200).json({ message: "Success", data: { product } });
        }
        catch (err) {
            next(err);
        }
    }
}
//# sourceMappingURL=products_controller.js.map