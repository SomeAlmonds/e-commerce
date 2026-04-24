import type { NextFunction, Request, Response } from "express";
export default class UsersController {
    #private;
    static registerUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static login(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static updateUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static getUserByName(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
//# sourceMappingURL=users_controller.d.ts.map