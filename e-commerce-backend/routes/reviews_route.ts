import express from "express";
import { body, param } from "express-validator";
import ReviewsController from "../controllers/reviews_controller.js";
import errorHandler from "../middleware/error_middleware.js";

const reviewsRouter = express.Router();

reviewsRouter.get(
  "/product/:product_id",
  [param("product_id").isNumeric().notEmpty().exists().trim().escape()],
  ReviewsController.getProductReviews,
);

reviewsRouter.get(
  "/user/:user_id",
  [param("product_id").isNumeric().notEmpty().exists().trim().escape()],
  ReviewsController.getUserReviews,
);

reviewsRouter.post(
  "/post",
  [
    body(["user_id", "product_id", "review_stars"])
      .isNumeric()
      .notEmpty()
      .exists()
      .trim()
      .escape(),
    body("review_txt")
      .isString()
      .isLength({ max: 300 })
      .notEmpty()
      .exists()
      .trim()
      .escape(),
  ],
  ReviewsController.postReview,
);

reviewsRouter.use(errorHandler);

export default reviewsRouter;
