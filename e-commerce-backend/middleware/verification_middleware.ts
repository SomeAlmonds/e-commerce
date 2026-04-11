import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/error_handler.js";

const verify = jwt.verify;
const JWT_KEY = process.env.JWT_KEY as string;

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const auth_header = req.headers.authorization;

  if (!auth_header) {
    return next(new AppError(401, "Missing authorization header"));
  }

  const token = auth_header.split(" ")[1];

  if (!token) {
    return next(new AppError(401, "Missing or invalid token"));
  }

  try {
    const decoded = verify(token, JWT_KEY) as JwtPayload;
    req.user = { user_id: decoded.user_id, user_name: decoded.user_name };
    next();
  } catch (err) {
    next(new AppError(403, "Invalid or expired token"));
  }
}
