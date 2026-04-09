import express from "express";
import { body } from "express-validator";
import { getUserByName, login, registerUser, updateUser, } from "../controllers/user_controller.js";
import errorHandler from "../middleware/error_middleware.js";
import { verifyJwt } from "../middleware/verification_middleware.js";
const userRouter = express.Router();
userRouter.use((req, res, next) => {
    res.setHeader("Content-type", "application/json");
    return next();
});
userRouter.post("/register", [
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
], registerUser);
userRouter.post("/login", [
    body("name")
        // .isString()
        .isLength({ min: 2 })
        .trim()
        .notEmpty()
        .withMessage("user name"),
    body("password")
        // .isString()
        .isLength({ min: 8 })
        .escape()
        .exists()
        .notEmpty()
        .withMessage("password"),
    body("email").isEmail().normalizeEmail().notEmpty().withMessage("email"),
], login);
userRouter.put("/update", [
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
], updateUser);
userRouter.get("/:user", [
    body("name")
        .isString()
        .isLength({ min: 2 })
        .trim()
        .exists()
        .notEmpty()
        .withMessage("user name"),
], verifyJwt, getUserByName);
userRouter.use("/", (req, res) => {
    res.status(200).send("user route");
});
userRouter.use(errorHandler);
export default userRouter;
//# sourceMappingURL=user_route.js.map