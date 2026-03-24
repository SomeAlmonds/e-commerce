import type { Connection } from "mysql2/promise";
export declare function handleUserRegister(user: {
    user_name: string;
    email: string;
    password: string;
}, db: Connection): Promise<boolean>;
export declare function chkEmailValid(email: string, db: Connection): Promise<boolean>;
export declare function chkUsernameValid(user_name: string, db: Connection): Promise<boolean>;
export declare function handleLogin(user: {
    user_name: string;
    password: string;
}, db: Connection): Promise<boolean>;
export declare function handleUpdateUser(user: {
    new_user_name: string;
    old_user_name: string;
    old_password: string;
    new_password: string;
}, db: Connection): Promise<boolean>;
//# sourceMappingURL=user.d.ts.map