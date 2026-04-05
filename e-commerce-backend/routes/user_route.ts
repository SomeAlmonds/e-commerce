import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import {
  login,
  registerUser,
  updateUser,
} from "../controllers/user_controller.js";
import errorHandler from "../middleware/error_middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.get("/login", login);

userRouter.put("/update", updateUser);

userRouter.use("/", (req, res) => {
  res.status(200).send("user route");
});

userRouter.use(errorHandler);

export default userRouter;
