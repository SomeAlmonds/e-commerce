import express from "express";
import { db } from "./db.js";
import { chkEmailValid, chkUsernameValid, handleLogin, handleUpdateUser, handleUserRegister, } from "./user.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT);
app.get("/", (req, res) => {
    res.send(`listining to ${req.protocol}://${req.get("host")}/${req.baseUrl}`);
});
app.get("/register", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    // res.setHeader(
    //   "Access-Control-Allow-Origin",
    // );
    const user_name = req.query.name?.toString();
    const user_email = req.query.email?.toString();
    const user_pass = req.query.password?.toString();
    if (user_name && user_email && user_pass) {
        // look if user info (email and username) already exists
        const valid_user_name = await chkUsernameValid(user_name, db);
        if (!valid_user_name) {
            res.status(403).send("Username already taken");
            return;
        }
        const valid_user_email = await chkEmailValid(user_email, db);
        if (!valid_user_email) {
            res.status(403).send("Email already used in an account, login?");
            return;
        }
        try {
            const reg_valid = await handleUserRegister({
                user_name,
                email: user_email,
                password: user_pass,
            }, db);
            if (reg_valid) {
                res.status(204).send();
            }
            else {
                // if the db declines the data for some reason
                res.status(500).send("Somthing went wrong :(");
            }
            return;
        }
        catch (err) {
            res.status(500).send(err);
            return;
        }
    }
    else {
        res.status(400).send("Invalid input");
        return;
    }
});
app.get("/login", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    // res.setHeader(
    //   "Access-Control-Allow-Origin",
    // );
    const user_name = req.query.user_name?.toString();
    const user_pass = req.query.password?.toString();
    if (user_name && user_pass) {
        try {
            const login_valid = await handleLogin({ user_name, password: user_pass }, db);
            if (login_valid) {
                res.status(204).send();
                return;
            }
            else {
                res.status(403).send("Incorrect user name or password");
                return;
            }
        }
        catch (err) {
            res.status(500).send(err);
            return;
        }
    }
    else {
        res.status(400).send("Invalid input");
        return;
    }
});
app.get("/update_user", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    // res.setHeader(
    //   "Access-Control-Allow-Origin",
    // );
    const old_user_name = req.query.old_user_name?.toString();
    const old_password = req.query.old_password?.toString();
    const new_user_name = req.query.new_user_name?.toString();
    const new_password = req.query.new_password?.toString();
    if (old_user_name && old_password && new_user_name && new_password) {
        try {
            const valid_user_name = await chkUsernameValid(new_user_name, db);
            if (!valid_user_name) {
                res.status(403).send("Username already taken");
                return;
            }
        }
        catch (err) {
            res.status(500).send(err);
            return;
        }
        try {
            const updated = await handleUpdateUser({
                old_user_name,
                old_password,
                new_user_name,
                new_password,
            }, db);
            if (updated) {
                res.status(200).send();
                return;
            }
            else {
                res.send(403).send("Incorrct password");
                return;
            }
        }
        catch (err) {
            res.status(500).send(err);
            return;
        }
    }
    else {
        res.status(400).send("Invalid input");
        return;
    }
});
export default app;
//# sourceMappingURL=index.js.map