import { validationResult } from "express-validator";
import { AppError } from "../utils/error_handler.js";
export function validateInput(req, res, next) {
    const validation_errs = validationResult(req);
    if (!validation_errs.isEmpty()) {
        const err_msg_array = validation_errs
            .array()
            .map((err) => String(err.msg))
            .filter((msg) => !msg.includes("Invalid"));
        return next(new AppError(400, "Invalid " + err_msg_array.join(", ")));
    }
    else {
        return next();
    }
}
//# sourceMappingURL=input_validation_middleware.js.map