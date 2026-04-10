import type {
  Connection,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

const TABLE_NAME = "users";
const ENC_KEY = process.env.ENC_KEY;

export async function chkEmailValid(email: string, db: Connection) {
  // check if email already exists
  const query = `SELECT 1 FROM ${TABLE_NAME} WHERE email = ?;`;

  try {
    const [rows] = await db.execute<RowDataPacket[]>(query, [email]);

    // return false if user name already exists
    return rows.length ? false : true;
  } catch (err) {
    throw err;
  }
}

export async function chkUsernameValid(user_name: string, db: Connection) {
  // check user_name exist
  const query = `SELECT 1 FROM ${TABLE_NAME} WHERE user_name = ?;`;

  try {
    const [rows] = await db.execute<RowDataPacket[]>(query, [user_name]);

    // return false if user name already exists
    return rows.length ? false : true;
  } catch (err) {
    throw err;
  }
}

export async function handleUserRegister(
  user: {
    user_name: string;
    email: string;
    password: string;
  },
  db: Connection,
) {
  const query =
    `INSERT INTO ${TABLE_NAME} (user_name, email, password)` +
    `VALUES (?, ?, AES_ENCRYPT(?, '${ENC_KEY}'));`;

  try {
    const [rows] = await db.execute<ResultSetHeader>(query, [
      user.user_name,
      user.email,
      user.password,
    ]);

    return rows.affectedRows ? true : false;
  } catch (err) {
    throw err;
  }
}

export async function handleLogin(
  user: { user_name: string; password: string },
  db: Connection,
) {
  const query =
    `SELECT 1 FROM ${TABLE_NAME} WHERE` +
    ` user_name = ? AND password = AES_ENCRYPT(?, '${ENC_KEY}');`;

  try {
    const [rows] = await db.execute<RowDataPacket[]>(query, [
      user.user_name,
      user.password,
    ]);

    return rows.length ? true : false;
  } catch (err) {
    throw err;
  }
}

export async function handleUpdateUser(
  user: {
    new_user_name: string;
    old_user_name: string;
    old_password: string;
    new_password: string;
  },
  db: Connection,
) {
  const query =
    `UPDATE ${TABLE_NAME} SET user_name = ? , password = AES_ENCRYPT( ? , '${ENC_KEY}') ` +
    `WHERE user_name = ? AND password = AES_ENCRYPT( ? , '${ENC_KEY}');`;

  try {
    const [rows] = await db.execute<ResultSetHeader>(query, [
      user.new_user_name,
      user.new_password,
      user.old_user_name,
      user.old_password,
    ]);

    return rows.affectedRows ? true : false;
  } catch (err) {
    throw err;
  }
}

export async function handleFetchUser(user_name: string, db: Connection) {
  const query = `SELECT user_id, user_name FROM ${TABLE_NAME} WHERE user_name = ? ;`;
  try {
    const [rows] = await db.execute(query, [user_name]);
    return rows;
  } catch (err) {
    throw err;
  }
}
