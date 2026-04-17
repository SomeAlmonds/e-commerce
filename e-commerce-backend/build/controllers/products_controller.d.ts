import type { NextFunction, Request, Response } from "express";
export default class ProductsController {
    static getProducts(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static getProductById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static getFilteredProducts(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
//# sourceMappingURL=products_controller.d.ts.map