import { Request } from "express";
export interface CustomReq extends Request {
    user: {
        user_id: number;
        user_name: string;
    };
}
//# sourceMappingURL=extended_req.d.ts.map