import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../utils/error_handler.js";

export default function validateInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // general checks
  const validation_errs = validationResult(req);

  if (!validation_errs.isEmpty()) {
    const err_msg_array = validation_errs.array().map((err) => String(err.msg));
    next(new AppError(400, err_msg_array.join(", ")));
    return 0;
  }
  //

  // Path specific checks
  if (req.path == "/login") {
    if (!req.body.name && !req.body.email) {
      next(new AppError(400, "Username or email required"));
      return 0;
    }
  }

  if (req.path == "/filter") {
    const queries = req.query;

    if (Object.values(queries).every((val) => val == undefined)) {
      next(
        new AppError(
          400,
          "All filters are empty, at least one filter requiered",
        ),
      );
      return 0;
    }
  }

  //
  return 1;
}
