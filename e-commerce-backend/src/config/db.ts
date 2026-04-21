import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  port: 21652,
  database: "defaultdb",
  dateStrings: true,
  enableKeepAlive: true,
});
