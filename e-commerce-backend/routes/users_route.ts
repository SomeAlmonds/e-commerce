import express from "express";
import { body, param } from "express-validator";
import UserController from "../controllers/users_controller.js";
import errorHandler from "../middleware/error_middleware.js";
import Verification from "../middleware/verification_middleware.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
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
  ],
  UserController.registerUser,
);

userRouter.post(
  "/login",
  [
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
  ],
  UserController.login,
);

userRouter.put(
  "/update",
  [
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
  ],
  Verification.verifyJwt,
  UserController.updateUser,
);

userRouter.get(
  "/:user",
  [param(":user").isLength({ min: 3 }).isString().notEmpty().trim().escape()],
  Verification.verifyJwt,
  UserController.getUserByName,
);

userRouter.use(errorHandler);

export default userRouter;
