import mysql from "mysql2/promise";
import { chkEmailValid, chkUsernameValid, handleUpdateUser, handleUserRegister, } from "./user.js";
// import { handleLogin } from "./user.js";
export const db = mysql.createPool({
    host: "almohanads-mysql-almohanads-proj.f.aivencloud.com",
    user: "almohanad",
    password: "AVNS_7Cug3pMuzrwv9qd3x7J",
    port: 21652,
    database: "defaultdb",
    enableKeepAlive: true,
});
try {
    await chkUsernameValid("test_user", db);
    const [rows] = await db.query("select * from users;");
    console.log("SECOND LOG/////////////", rows);
}
catch (err) {
    throw err;
}
//# sourceMappingURL=db.js.map