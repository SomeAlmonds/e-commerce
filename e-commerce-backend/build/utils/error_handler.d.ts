export interface AppError extends Error {
    status_code?: number;
    status?: "fail" | "error";
    is_operational?: boolean;
}
export declare class AppError extends Error {
    constructor(status_code: number, message: string);
}
//# sourceMappingURL=error_handler.d.ts.map