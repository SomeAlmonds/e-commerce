import mysql from "mysql2/promise";
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 21652,
    database: "defaultdb",
    enableKeepAlive: true,
});
//# sourceMappingURL=db.js.map