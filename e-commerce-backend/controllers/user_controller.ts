import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import {
  chkEmailValid,
  chkUsernameValid,
  handleFetchUser,
  handleLogin,
  handleUpdateUser,
  handleUserRegister,
} from "../models/user.js";
import { AppError } from "../utils/error_handler.js";
import { validateInput } from "../middleware/input_validation_middleware.js";

const sign = jwt.sign;
const JWT_KEY = process.env.JWT_KEY as string;

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // validate input
  if (!validateInput(req, res, next)) {
    return;
  }
  //

  const user_name = req.body.name as string;
  const user_email = req.body.email as string;
  const user_pass = req.body.password as string;

  // look if user info (email and username) already exists
  const valid_user_name = await chkUsernameValid(user_name, db);
  if (!valid_user_name) {
    return next(new AppError(409, "Username taken"));
  }

  const valid_user_email = await chkEmailValid(user_email, db);
  if (!valid_user_email) {
    return next(new AppError(409, "Email already taken"));
  }
  //

  try {
    const reg_valid = await handleUserRegister(
      {
        user_name,
        email: user_email,
        password: user_pass,
      },
      db,
    );

    if (reg_valid) {
      return res.status(201).json({ message: "User registered" });
    } else {
      // if the db declines the data for some reason
      return next(new Error("database error"));
    }
  } catch (err) {
    return next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  // validate input
  if (!validateInput(req, res, next)) {
    return;
  }
  //

  const { name, password } = req.body;

  try {
    const login_valid = await handleLogin({ user_name: name, password }, db);

    if (login_valid) {
      const token = sign({ user_name: name }, JWT_KEY, {
        expiresIn: "24h",
      });

      return res.status(200).json({ message: "login successful", token }).end();
    } else {
      throw new AppError(403, "Incorrect username or password");
    }
  } catch (err) {
    return next(err);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // validate input
  if (!validateInput(req, res, next)) {
    return;
  }
  //

  const old_user_name = req.body.old_name as string;
  const old_password = req.body.old_password as string;
  const new_user_name = req.body.new_name as string;
  const new_password = req.body.new_password as string;

  try {
    const valid_user_name = await chkUsernameValid(new_user_name, db);

    if (!valid_user_name) {
      return next(new AppError(409, "Username taken"));
    }
  } catch (err) {
    return next(err);
  }

  try {
    const updated = await handleUpdateUser(
      {
        old_user_name,
        old_password,
        new_user_name,
        new_password,
      },
      db,
    );

    if (updated) {
      /////////////// temp res //////////////////
      const token = sign({ new_user_name }, JWT_KEY, { expiresIn: "24h" });
      return res.status(200).json({ message: "User updated", token });
    } else {
      return next(new AppError(403, "Incorrect password"));
    }
  } catch (err) {
    return next(err);
  }
}

export async function getUserByName(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // validate input
  if (!validateInput(req, res, next)) {
    return;
  }
  //

  const user_name = req.params.user as string;

  try {
    const user = await handleFetchUser(user_name, db);

    if (!user) {
      return next(new AppError(404, "User not found"));
    }
    res.status(200).json({ message: "Success", user, name: req.user.name });
  } catch (err) {
    return next(err);
  }
}
