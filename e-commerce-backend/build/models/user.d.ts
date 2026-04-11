import type { Connection, RowDataPacket } from "mysql2/promise";
export declare function chkEmailValid(email: string, db: Connection): Promise<boolean>;
export declare function chkUsernameValid(user_name: string, db: Connection): Promise<boolean>;
export declare function handleUserRegister(user: {
    user_name: string;
    email: string;
    password: string;
}, db: Connection): Promise<boolean>;
export declare function handleLogin(user: {
    user_id: string;
    password: string;
}, name_or_email: "user_name" | "user_email", db: Connection): Promise<RowDataPacket | undefined>;
export declare function handleUpdateUser(user: {
    new_name: string;
    old_name: string;
    old_password: string;
    new_password: string;
}, db: Connection): Promise<RowDataPacket | undefined>;
export declare function handleFetchUser(user_name: string, db: Connection): Promise<RowDataPacket | undefined>;
//# sourceMappingURL=user.d.ts.map