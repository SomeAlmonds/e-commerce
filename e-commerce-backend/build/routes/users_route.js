import express from "express";
import { body, param } from "express-validator";
import UsersController from "../controllers/users_controller.js";
import errorHandler from "../middleware/error_middleware.js";
import Verification from "../middleware/verification_middleware.js";
const usersRouter = express.Router();
usersRouter.post("/register", [
    body("name")
        .isString()
        .isLength({ min: 2 })
        .trim()
        .notEmpty()
        .exists()
        .withMessage("user name"),
    body("password")
        .isString()
        .isLength({ min: 8 })
        .escape()
        .exists()
        .notEmpty()
        .withMessage("password"),
    body("email")
        .isEmail()
        .normalizeEmail()
        .exists()
        .notEmpty()
        .withMessage("email"),
], UsersController.registerUser);
usersRouter.post("/login", [
    body("name")
        .optional()
        .isString()
        .isLength({ min: 2 })
        .trim()
        .withMessage("user name"),
    body("password")
        .isString()
        .isLength({ min: 8 })
        .escape()
        .exists()
        .withMessage("password"),
    body("email").optional().isEmail().normalizeEmail().withMessage("email"),
], UsersController.login);
usersRouter.put("/update", [
    body(["new_name", "old_name"])
        .isString()
        .isLength({ min: 2 })
        .trim()
        .exists()
        .notEmpty()
        .withMessage("user name"),
    body(["new_password", "old_password"])
        .isString()
        .isLength({ min: 8 })
        .escape()
        .exists()
        .notEmpty()
        .withMessage("password"),
], Verification.verifyJwt, UsersController.updateUser);
usersRouter.get("/:user", [param(":user").isLength({ min: 3 }).isString().notEmpty().trim().escape()], Verification.verifyJwt, UsersController.getUserByName);
usersRouter.use(errorHandler);
export default usersRouter;
//# sourceMappingURL=users_route.js.map