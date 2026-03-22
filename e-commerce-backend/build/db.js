import mysql from "mysql2/promise";
import { handleLogin } from "./user.js";
const db = await mysql.createConnection({
    host: "almohanads-mysql-almohanads-proj.f.aivencloud.com",
    user: "almohanad",
    password: "AVNS_7Cug3pMuzrwv9qd3x7J",
    port: 21652,
    database: "defaultdb",
});
try {
    const logedin = await handleLogin({ user_name: "test_use", password: "test_pass" }, db);
    if (logedin) {
        console.log("DONE LOGED IN");
    }
    else {
        console.log("NAAAH");
    }
}
catch (err) {
    throw err;
}
//# sourceMappingURL=db.js.map