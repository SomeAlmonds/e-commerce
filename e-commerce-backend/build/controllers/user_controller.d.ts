import type { NextFunction, Request, Response } from "express";
export declare function registerUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function login(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function updateUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function getUserByName(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=user_controller.d.ts.map