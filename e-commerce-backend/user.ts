import type { Connection, RowDataPacket } from "mysql2/promise";

const TABLE_NAME = "users";
const ENC_KEY = "temp_key";

// interface to access query resutl columns
interface val_exists extends RowDataPacket {
  val_exists: [0 | 1];
}

export async function handleUserRegister(
  db: Connection,
  user: {
    user_name: string;
    email: string;
    password: string;
  },
) {
  const query =
    `INSERT INTO ${TABLE_NAME} (user_name, email, password)` +
    `VALUES (?, ?, AES_ENCRYPT(?, '${ENC_KEY}'));`;

  try {
    await db.query(query, [user.user_name, user.email, user.password]);
    console.log("USER INSERT DONE");
    return true;
  } catch (err) {
    throw err;
  }
}

export async function chkEmailValid(email: string, db: Connection) {
  // check if email already exists
  const query = `SELECT EXISTS( SELECT 1 FROM ${TABLE_NAME} WHERE email = ? ) AS val_exists;`;

  try {
    const [rows] = await db.query<val_exists[]>(query, [email]);

    // return false if user name already exists
    return rows[0]?.val_exists ? false : true;
  } catch (err) {
    throw err;
  }
}

export async function chkUsernameValid(user_name: string, db: Connection) {
  // check user_name exist
  const query = `SELECT EXISTS( SELECT 1 FROM ${TABLE_NAME} WHERE user_name = ? ) AS val_exists;`;

  try {
    const [rows] = await db.query<val_exists[]>(query, [user_name]);

    // return false if user name already exists
    return rows[0]?.val_exists ? false : true;
  } catch (err) {
    throw err;
  }
}

export async function handleLogin(
  user: { user_name: string; password: string },
  db: Connection,
) {
  const query =
    `SELECT EXISTS( SELECT 1 FROM ${TABLE_NAME} WHERE` +
    ` user_name = ? AND password = AES_ENCRYPT(?, '${ENC_KEY}')) AS val_exists;`;

  try {
    const [rows] = await db.execute<val_exists[]>(query, [
      user.user_name,
      user.password,
    ]);

    return rows[0]?.val_exists ? true : false;
  } catch (err) {
    throw err;
  }
}
