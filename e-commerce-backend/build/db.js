import mysql from "mysql2";
import { handleUserRegister } from "./user.js";
const con = mysql.createConnection({
    host: "almohanads-mysql-almohanads-proj.f.aivencloud.com",
    user: "almohanad",
    password: "AVNS_7Cug3pMuzrwv9qd3x7J",
    port: 21652,
    database: "defaultdb",
});
con.connect((err_connect) => {
    if (err_connect)
        console.log("ERROR CONNECTING: " + err_connect);
    console.log("CONNECTED");
    // handleUserRegister(con, {
    //   user_name: "test_user",
    //   email: "test_email",
    //   password: "test_pass",
    // });
    const query = 'SELECT * F';
});
//# sourceMappingURL=db.js.map