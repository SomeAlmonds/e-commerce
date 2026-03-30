import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "almohanads-mysql-almohanads-proj.f.aivencloud.com",
  user: "almohanad",
  password: "AVNS_7Cug3pMuzrwv9qd3x7J",
  port: 21652,
  database: "defaultdb",
  enableKeepAlive: true,
});
