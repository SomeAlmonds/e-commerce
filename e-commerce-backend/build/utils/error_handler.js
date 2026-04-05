export class AppError extends Error {
    constructor(status_code, message) {
        super(message);
        this.status_code = status_code;
        this.status = `${status_code}`.startsWith("4") ? "fail" : "error";
        this.is_operational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=error_handler.js.map