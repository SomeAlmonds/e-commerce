const TABLE_NAME = "users";
const ENC_KEY = process.env.ENC_KEY;
export async function chkEmailValid(email, db) {
    // check if email already exists
    const query = `SELECT 1 FROM ${TABLE_NAME} WHERE email = ?;`;
    try {
        const [rows] = await db.execute(query, [email]);
        // return false if user name already exists
        return rows.length ? false : true;
    }
    catch (err) {
        throw err;
    }
}
export async function chkUsernameValid(user_name, db) {
    // check user_name exist
    const query = `SELECT 1 FROM ${TABLE_NAME} WHERE user_name = ?;`;
    try {
        const [rows] = await db.execute(query, [user_name]);
        // return false if user name already exists
        return rows.length ? false : true;
    }
    catch (err) {
        throw err;
    }
}
export async function handleUserRegister(user, db) {
    const query = `INSERT INTO ${TABLE_NAME} (user_name, email, password)` +
        `VALUES (?, ?, AES_ENCRYPT(?, '${ENC_KEY}'));`;
    try {
        const [rows] = await db.execute(query, [
            user.user_name,
            user.email,
            user.password,
        ]);
        return rows.affectedRows ? true : false;
    }
    catch (err) {
        throw err;
    }
}
export async function handleLogin(user, db) {
    const query = `SELECT 1 FROM ${TABLE_NAME} WHERE` +
        ` user_name = ? AND password = AES_ENCRYPT(?, '${ENC_KEY}');`;
    try {
        const [rows] = await db.execute(query, [
            user.user_name,
            user.password,
        ]);
        return rows.length ? true : false;
    }
    catch (err) {
        throw err;
    }
}
export async function handleUpdateUser(user, db) {
    const query = `UPDATE ${TABLE_NAME} SET user_name = ? , password = AES_ENCRYPT( ? , '${ENC_KEY}') ` +
        `WHERE user_name = ? AND password = AES_ENCRYPT( ? , '${ENC_KEY}');`;
    try {
        const [rows] = await db.execute(query, [
            user.new_user_name,
            user.new_password,
            user.old_user_name,
            user.old_password,
        ]);
        return rows.affectedRows ? true : false;
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=user.js.map