import type { NextFunction, Request, Response } from "express";
export default class ProductController {
    static getProducts(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static getProductById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
//# sourceMappingURL=products_controller.d.ts.map