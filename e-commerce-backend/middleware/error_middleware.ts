import type { NextFunction, Request, Response } from "express";
import type { AppError } from "../utils/error_handler.js";

export default function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  err.status_code = err.status_code || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "dev") {
    return res
      .status(err.status_code)
      .json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err,
      })
      .end();
  } else {
    if (err.is_operational) {
      return res
        .status(err.status_code)
        .json({
          status: err.status,
          message: err.message,
        })
        .end();
    } else {
      console.error("UNEXPECTED ERROR: ", err);
      return res.status(500).json({ message: "somthing went wrong" }).end();
    }
  }
}
