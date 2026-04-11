const TABLE_NAME = "users";
const ENC_KEY = process.env.ENC_KEY;
export async function chkEmailValid(email, db) {
    // check if email already exists
    const query = `SELECT 1 FROM ${TABLE_NAME} WHERE user_email = ?;`;
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
    const create_date = new Date();
    const query = `INSERT INTO ${TABLE_NAME} (user_name, user_email, user_password, user_create_date)` +
        `VALUES (?, ?, AES_ENCRYPT(?, '${ENC_KEY}'), ?);`;
    try {
        const [rows] = await db.execute(query, [
            user.user_name,
            user.email,
            user.password,
            create_date,
        ]);
        return rows.affectedRows ? true : false;
    }
    catch (err) {
        throw err;
    }
}
export async function handleLogin(user, name_or_email, db) {
    const query = `SELECT user_id, user_name FROM ${TABLE_NAME} WHERE` +
        ` ${name_or_email} = ? AND user_password = AES_ENCRYPT(?, '${ENC_KEY}');`;
    try {
        const [rows] = await db.execute(query, [
            user.user_id,
            user.password,
        ]);
        return rows[0];
    }
    catch (err) {
        throw err;
    }
}
export async function handleUpdateUser(user, db) {
    const query = `UPDATE ${TABLE_NAME} SET user_name = ? , user_password = AES_ENCRYPT( ? , '${ENC_KEY}') ` +
        `WHERE user_name = ? AND user_password = AES_ENCRYPT( ? , '${ENC_KEY}');`;
    try {
        const [rows] = await db.execute(query, [
            user.new_name,
            user.new_password,
            user.old_name,
            user.old_password,
        ]);
        if (rows.affectedRows) {
            const query_2 = `SELECT user_id, user_name FROM ${TABLE_NAME} WHERE user_name = ?;`;
            const [rows_2] = await db.execute(query_2, [
                user.new_name,
            ]);
            return rows_2[0];
        }
        else {
            return undefined;
        }
    }
    catch (err) {
        throw err;
    }
}
export async function handleFetchUser(user_name, db) {
    const query = `SELECT user_id, user_name FROM ${TABLE_NAME} WHERE user_name = ? LIMIT 1;`;
    try {
        const [rows] = await db.execute(query, [user_name]);
        return rows[0];
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=user.js.map