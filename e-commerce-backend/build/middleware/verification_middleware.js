import jwt from "jsonwebtoken";
import { AppError } from "../utils/error_handler.js";
export default class Verification {
    static #verify = jwt.verify;
    static #JWT_KEY = process.env.JWT_KEY;
    static verifyJwt(req, res, next) {
        const auth_header = req.headers.authorization;
        if (!auth_header) {
            return next(new AppError(401, "Missing authorization header"));
        }
        const token = auth_header.split(" ")[1];
        if (!token) {
            return next(new AppError(401, "Missing or invalid token"));
        }
        try {
            const decoded = this.#verify(token, this.#JWT_KEY);
            req.user = { user_id: decoded.user_id, user_name: decoded.user_name };
            // Check if token owner can make requested edit
            if (req.path == "/update") {
                if (req.user.user_name !== req.body.old_name) {
                    next(new AppError(403, "Token dose not match target user"));
                }
            }
            next();
        }
        catch (err) {
            next(new AppError(403, "Invalid or expired token"));
        }
    }
}
//# sourceMappingURL=verification_middleware.js.map