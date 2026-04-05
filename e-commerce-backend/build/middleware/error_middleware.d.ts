import type { NextFunction, Request, Response } from "express";
import type { AppError } from "../utils/error_handler.js";
export default function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=error_middleware.d.ts.map