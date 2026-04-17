import validateInput from "../middleware/input_validation_middleware.js";
import ReviewsModel from "../models/reviews_model.js";
import { db } from "../config/db.js";
import { AppError } from "../utils/error_handler.js";
export default class ReviewsController {
    static async getProductReviews(req, res, next) {
        // validate input
        if (!validateInput(req, res, next)) {
            return;
        }
        //
        try {
            const reviews = await ReviewsModel.getProductReviews(Number(req.params.product_id), db);
            if (!reviews) {
                throw new AppError(404, "No reviews found");
            }
            return res.status(200).json({ message: "Success", data: { reviews } });
        }
        catch (err) {
            next(err);
        }
    }
    static async getUserReviews(req, res, next) {
        // validate input
        if (!validateInput(req, res, next)) {
            return;
        }
        //
        try {
            const reviews = await ReviewsModel.getUserReviews(Number(req.params.user_id), db);
            if (!reviews) {
                throw new AppError(404, "No reviews found");
            }
            return res.status(200).json({ message: "Success", data: { reviews } });
        }
        catch (err) {
            next(err);
        }
    }
    static async postReview(req, res, next) {
        // validate input
        if (!validateInput(req, res, next)) {
            return;
        }
        //
        try {
            const inserted = await ReviewsModel.insertReview(req.body, db);
            if (!inserted) {
                throw new AppError(500, "Somthing went wrong");
            }
            return res.status(201).json({ message: "Success" });
        }
        catch (err) {
            next(err);
        }
    }
}
//# sourceMappingURL=reviews_controller.js.map