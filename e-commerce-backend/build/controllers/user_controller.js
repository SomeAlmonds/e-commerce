import { db } from "../config/db.js";
import { chkEmailValid, chkUsernameValid, handleLogin, handleUpdateUser, handleUserRegister, } from "../models/user.js";
import { AppError } from "../utils/error_handler.js";
export async function registerUser(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    const user_name = req.query.name?.toString();
    const user_email = req.query.email?.toString();
    const user_pass = req.query.password?.toString();
    if (user_name && user_email && user_pass) {
        // look if user info (email and username) already exists
        const valid_user_name = await chkUsernameValid(user_name, db);
        if (!valid_user_name) {
            next(new AppError(409, "Username taken"));
        }
        const valid_user_email = await chkEmailValid(user_email, db);
        if (!valid_user_email) {
            next(new AppError(409, "Email already taken"));
        }
        try {
            const reg_valid = await handleUserRegister({
                user_name,
                email: user_email,
                password: user_pass,
            }, db);
            if (reg_valid) {
                ///////////////////// temp res ///////////////
                res.status(204).send();
            }
            else {
                // if the db declines the data for some reason
                next(new Error("database error"));
            }
            return;
        }
        catch (err) {
            next(err);
        }
    }
    else {
        next(new AppError(400, "Invalid input"));
    }
}
export async function login(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    const user_name = req.query.name?.toString();
    const user_pass = req.query.password?.toString();
    if (user_name && user_pass) {
        try {
            const login_valid = await handleLogin({ user_name, password: user_pass }, db);
            if (login_valid) {
                ///////////////// temp res ////////////////////////////
                res.status(200).send("logged in");
            }
            else {
                next(new AppError(403, "Incorrect username or password"));
            }
        }
        catch (err) {
            next(err);
            return;
        }
    }
    else {
        next(new AppError(400, "Invalid input"));
    }
}
export async function updateUser(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    const old_user_name = req.query.old_name?.toString();
    const old_password = req.query.old_password?.toString();
    const new_user_name = req.query.new_name?.toString();
    const new_password = req.query.new_password?.toString();
    if (old_user_name && old_password && new_user_name && new_password) {
        try {
            const valid_user_name = await chkUsernameValid(new_user_name, db);
            if (!valid_user_name) {
                next(new AppError(409, "Username taken"));
            }
        }
        catch (err) {
            next(err);
        }
        try {
            const updated = await handleUpdateUser({
                old_user_name,
                old_password,
                new_user_name,
                new_password,
            }, db);
            if (updated) {
                /////////////// temp res //////////////////
                res.status(200).send();
            }
            else {
                next(new AppError(403, "Incorrect password"));
            }
        }
        catch (err) {
            next(err);
            return;
        }
    }
    else {
        next(new AppError(400, "Invalid input"));
    }
}
//# sourceMappingURL=user_controller.js.map