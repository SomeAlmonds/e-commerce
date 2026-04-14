import type { Connection, RowDataPacket } from "mysql2/promise";
export default class UserModel {
    static table_name: string;
    static ENC_KEY: string | undefined;
    /**
     * Checks if the provided user name already exists in the database
     * @param {string} email - User email
     * @param {Connection} db - Database connection
     * @returns A promis, true if the email is valid (does not exist in db) false if not
     * @throws An error if there was a problem querying the db
     */
    static validateEmail(email: string, db: Connection): Promise<boolean>;
    /**
     * Checks if the provided user name already exists in the database
     * @param {string} name - User name
     * @param {Connection} db - Database connection
     * @returns A promis, true if the email is valid (does not exist in db) false if not
     * @throws An error if there was a problem querying the db
     */
    static validateName(name: string, db: Connection): Promise<boolean>;
    /**
     * Inserts the user to the database
     * @param user - User object {name: string, password: string, email: string}
     * @param {Connection} db - Database connection
     * @returns True if the user is inserted, false if not
     * @throws An error if there was a problem querying the db
     */
    static register(user: {
        name: string;
        email: string;
        password: string;
    }, db: Connection): Promise<boolean>;
    /**
     * Checks if there is a user name/email and password match in the database
     * @param user - {user_id: user name or email string, password: string}
     * @param name_or_email "user_name" or "user_email" to indecate which is used
     * @param {Connection} db Database connection
     * @returns RowDataPacket {user_id, user_name} if a match is found, or undefined if not
     * @throws An error if there was a problem querying the db
     */
    static login(user: {
        user_id: string;
        password: string;
    }, name_or_email: "user_name" | "user_email", db: Connection): Promise<RowDataPacket | undefined>;
    /**
     * Cheks for user match and updates name and/or password
     * @param user User object with string properties {old_name, old_password new_name, new_password}
     * @param {Connection} db Database connection
     * @returns Updated user RowDataPacket {user_id, user_name} if a match was found and updated, undifined if not
     * @throws AppError if both new_name and new_password are undifined
     * @throws An error if there was a problem querying the db
     */
    static update(user: {
        old_name: string;
        new_name: string | undefined;
        old_password: string;
        new_password: string | undefined;
    }, db: Connection): Promise<RowDataPacket | undefined>;
    /**
     * Searchs for a user name matchc in the database and returns the user
     * @param {string} name User name
     * @param {Connection} db Database connection
     * @returns RowDataPacket {user_id, user_name} if a match was found, undifined if not
     * @throws An error if there was a problem querying the db
     */
    static getByName(name: string, db: Connection): Promise<RowDataPacket | undefined>;
}
//# sourceMappingURL=user_model.d.ts.map