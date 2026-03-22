const TABLE_NAME = "users";
const ENC_KEY = "temp_key";
export async function handleUserRegister(db, user) {
    const query = `INSERT INTO ${TABLE_NAME} (user_name, email, password)` +
        `VALUES (?, ?, AES_ENCRYPT(?, '${ENC_KEY}'));`;
    try {
        await db.query(query, [user.user_name, user.email, user.password]);
        console.log("USER INSERT DONE");
        return true;
    }
    catch (err) {
        throw err;
    }
}
export async function chkEmailValid(email, db) {
    // check if email already exists
    const query = `SELECT EXISTS( SELECT 1 FROM ${TABLE_NAME} WHERE email = ? ) AS val_exists;`;
    try {
        const [rows] = await db.query(query, [email]);
        // return false if user name already exists
        return rows[0]?.val_exists ? false : true;
    }
    catch (err) {
        throw err;
    }
}
export async function chkUsernameValid(user_name, db) {
    // check user_name exist
    const query = `SELECT EXISTS( SELECT 1 FROM ${TABLE_NAME} WHERE user_name = ? ) AS val_exists;`;
    try {
        const [rows] = await db.query(query, [user_name]);
        // return false if user name already exists
        return rows[0]?.val_exists ? false : true;
    }
    catch (err) {
        throw err;
    }
}
export async function handleLogin(user, db) {
    const query = `SELECT EXISTS( SELECT 1 FROM ${TABLE_NAME} WHERE` +
        ` user_name = ? AND password = AES_ENCRYPT(?, '${ENC_KEY}')) AS val_exists;`;
    try {
        const [rows] = await db.execute(query, [
            user.user_name,
            user.password,
        ]);
        return rows[0]?.val_exists ? true : false;
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=user.js.map