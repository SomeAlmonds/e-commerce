import { AppError } from "../utils/error_handler.js";
export default class UserModel {
    static TABLE_NAME = "users";
    static ENC_KEY = process.env.ENC_KEY;
    /**
     * Checks if the provided user name already exists in the database
     * @param {string} email - User email
     * @param {Connection} db - Database connection
     * @returns A promis, true if the email is valid (does not exist in db) false if not
     * @throws An error if there was a problem querying the db
     */
    static async validateEmail(email, db) {
        const query = `SELECT 1 FROM ${this.TABLE_NAME} WHERE user_email = ?;`;
        try {
            const [rows] = await db.execute(query, [email]);
            // return false if user name already exists
            return rows.length ? false : true;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Checks if the provided user name already exists in the database
     * @param {string} name - User name
     * @param {Connection} db - Database connection
     * @returns A promis, true if the email is valid (does not exist in db) false if not
     * @throws An error if there was a problem querying the db
     */
    static async validateName(name, db) {
        const query = `SELECT 1 FROM ${this.TABLE_NAME} WHERE user_name = ?;`;
        try {
            const [rows] = await db.execute(query, [name]);
            // return false if user name already exists
            return rows.length ? false : true;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Inserts the user to the database
     * @param user - User object {name: string, password: string, email: string}
     * @param {Connection} db - Database connection
     * @returns True if the user is inserted, false if not
     * @throws An error if there was a problem querying the db
     */
    static async register(user, db) {
        const create_date = new Date();
        const query = `INSERT INTO ${this.TABLE_NAME} (user_name, user_email, user_password, user_create_date)` +
            `VALUES (?, ?, AES_ENCRYPT(?, '${this.ENC_KEY}'), ?);`;
        try {
            const [rows] = await db.execute(query, [
                user.name,
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
    /**
     * Checks if there is a user name/email and password match in the database
     * @param user - {user_id: user name or email string, password: string}
     * @param name_or_email "user_name" or "user_email" to indecate which is used
     * @param {Connection} db Database connection
     * @returns RowDataPacket {user_id, user_name} if a match is found, or undefined if not
     * @throws An error if there was a problem querying the db
     */
    static async login(user, name_or_email, db) {
        const query = `SELECT user_id, user_name FROM ${this.TABLE_NAME} WHERE` +
            ` ${name_or_email} = ? AND user_password = AES_ENCRYPT(?, '${this.ENC_KEY}');`;
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
    /**
     * Cheks for user match and updates name and/or password
     * @param user User object with string properties {old_name, old_password new_name, new_password}
     * @param {Connection} db Database connection
     * @returns Updated user RowDataPacket {user_id, user_name} if a match was found and updated, undifined if not
     * @throws AppError if both new_name and new_password are undifined
     * @throws An error if there was a problem querying the db
     */
    static async update(user, db) {
        if (!user.new_name && !user.new_password) {
            throw new AppError(400, "Either new_name or new_password required");
        }
        const query = `UPDATE ${this.TABLE_NAME} SET user_name = ? , user_password = AES_ENCRYPT( ? , '${this.ENC_KEY}')  ` +
            `WHERE user_name = ? AND user_password = AES_ENCRYPT( ? , '${this.ENC_KEY}');`;
        const values_arr = [user.old_name, user.old_password];
        // if value = undifined use old_val instead so that it changes to the same thing
        // this is to keep all the possiblities in one query
        values_arr.unshift(user.new_password ? user.new_password : user.old_password);
        values_arr.unshift(user.new_name ? user.new_name : user.old_name);
        //
        try {
            const [rows] = await db.execute(query, [values_arr]);
            if (rows.affectedRows) {
                const query_2 = `SELECT user_id, user_name FROM ${this.TABLE_NAME} ` +
                    `WHERE user_name = ? AND user_password = AES_ENCRYPT( ? , '${this.ENC_KEY}');`;
                const [rows_2] = await db.execute(query_2, [
                    user.new_name ? user.new_name : user.old_name,
                    user.new_password ? user.new_password : user.old_password,
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
    /**
     * Searchs for a user name matchc in the database and returns the user
     * @param {string} name User name
     * @param {Connection} db Database connection
     * @returns RowDataPacket {user_id, user_name} if a match was found, undifined if not
     * @throws An error if there was a problem querying the db
     */
    static async getByName(name, db) {
        const query = `SELECT user_id, user_name FROM ${this.TABLE_NAME} WHERE user_name = ? LIMIT 1;`;
        try {
            const [rows] = await db.execute(query, [name]);
            return rows[0] ? rows[0] : undefined;
        }
        catch (err) {
            throw err;
        }
    }
}
//# sourceMappingURL=user_model.js.map