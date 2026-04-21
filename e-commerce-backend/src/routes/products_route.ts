import Express from "express";
import { param, query } from "express-validator";
import ProductsController from "../src/controllers/products_controller.js";
import errorHandler from "../src/middleware/error_middleware.js";

const productsRouter = Express.Router();

productsRouter.get(
  "/",
  [query("page").isNumeric().notEmpty().trim().escape()],
  ProductsController.getProducts,
);

productsRouter.get(
  "/:product_id",
  [param("product_id").isNumeric().notEmpty()],
  ProductsController.getProductById,
);

productsRouter.get(
  "/filter",
  [
    query("page").isNumeric().notEmpty().trim().escape(),
    query("product_name").isString().notEmpty().optional().escape().trim(),
    query("product_category").isString().notEmpty().optional().escape().trim(),
    query(["product_rating", "min_price", "max_price"])
      .isNumeric()
      .notEmpty()
      .optional()
      .escape()
      .trim(),
  ],
  ProductsController.getFilteredProducts,
);

productsRouter.use(errorHandler);

export default productsRouter;
