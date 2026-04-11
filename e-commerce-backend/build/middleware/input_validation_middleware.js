import { validationResult } from "express-validator";
import { AppError } from "../utils/error_handler.js";
export function validateInput(req, res, next) {
    // general checks
    const validation_errs = validationResult(req);
    if (!validation_errs.isEmpty()) {
        const err_msg_array = validation_errs.array().map((err) => String(err.msg));
        next(new AppError(400, err_msg_array.join(", ")));
        return 0;
    }
    // Path specific checks
    if (req.path == "/login") {
        if (!req.body.name && !req.body.email) {
            next(new AppError(400, "Username or email required"));
            return 0;
        }
    }
    return 1;
}
//# sourceMappingURL=input_validation_middleware.js.map