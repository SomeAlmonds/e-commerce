import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import validateInput from "../middleware/input_validation_middleware.js";
import UsersModel from "../models/users_model.js";
import { AppError } from "../utils/error_handler.js";

export default class UsersController {
  static #sign = jwt.sign;
  static #JWT_KEY = process.env.JWT_KEY as string;

  static async registerUser(req: Request, res: Response, next: NextFunction) {
    // validate input
    if (!validateInput(req, res, next)) {
      return;
    }
    //

    const { name, email, password } = req.body;

    // look if user info (email and username) already exists
    if (!(await UsersModel.validateName(name, db))) {
      return next(new AppError(409, "Username taken"));
    }

    if (!(await UsersModel.validateEmail(email, db))) {
      return next(new AppError(409, "Email already taken"));
    }
    //

    try {
      const registered = await UsersModel.register(
        { name, email, password },
        db,
      );

      if (registered) {
        return res.status(201).json({ message: "User registered" });
      } else {
        // if the db declines the data for some reason
        return next(new Error("database error"));
      }
    } catch (err) {
      return next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    // validate input
    if (!validateInput(req, res, next)) {
      return;
    }
    //

    const { password } = req.body;
    // user can login with either user name or email
    // the code below is to know wich one the user is using
    let user_id = "";
    let name_or_email: "user_name" | "user_email" = "user_name";

    if (req.body.name) {
      user_id = req.body.name as string;
    } else {
      user_id = req.body.email as string;
      name_or_email = "user_email";
    }
    //

    try {
      const user = await UsersModel.login(
        { user_id, password },
        name_or_email,
        db,
      );

      if (user) {
        const token = this.#sign(user, this.#JWT_KEY, {
          expiresIn: "24h",
        });

        return res
          .status(200)
          .json({ message: "login successful", data: { token } });
      } else {
        throw new AppError(403, "Incorrect username or password");
      }
    } catch (err) {
      return next(err);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    // validate input
    if (!validateInput(req, res, next)) {
      return;
    }
    //

    const { old_name, old_password, new_name, new_password } = req.body;

    try {
      const valid_user_name = await UsersModel.validateName(new_name, db);

      if (!valid_user_name) {
        throw new AppError(409, "Username taken");
      }
    } catch (err) {
      return next(err);
    }

    try {
      const updated_user = await UsersModel.update(
        {
          old_name,
          old_password,
          new_name,
          new_password,
        },
        db,
      );

      if (!updated_user) {
        throw new AppError(403, "Incorrect user name or password");
      }

      const token = this.#sign(updated_user, this.#JWT_KEY, {
        expiresIn: "24h",
      });

      return res.status(200).json({ message: "User updated", data: { token } });
    } catch (err) {
      return next(err);
    }
  }

  static async getUserByName(req: Request, res: Response, next: NextFunction) {
    // validate input
    if (!validateInput(req, res, next)) {
      return;
    }
    //

    try {
      const user = await UsersModel.getByName(req.params.user as string, db);

      if (!user) {
        throw new AppError(404, "User not found");
      }
      return res.status(200).json({
        message: "Success",
        data: {
          user: { ...user, editable: req.user.user_name === user.user_name },
        },
      });
    } catch (err) {
      return next(err);
    }
  }
}
