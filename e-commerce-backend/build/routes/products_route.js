import Express from "express";
import errorHandler from "../middleware/error_middleware.js";
import { param, query } from "express-validator";
import ProductController from "../controllers/products_controller.js";
const productRouter = Express.Router();
productRouter.get("/", [query("page").isNumeric().notEmpty()], ProductController.getProducts);
productRouter.get("/:product_id", [param("product_id").isNumeric().notEmpty()], ProductController.getProductById);
productRouter.use(errorHandler);
export default productRouter;
//# sourceMappingURL=products_route.js.map