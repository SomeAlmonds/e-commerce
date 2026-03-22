import type { Connection } from "mysql2/promise";
export declare function handleUserRegister(db: Connection, user: {
    user_name: string;
    email: string;
    password: string;
}): Promise<boolean>;
export declare function chkEmailValid(email: string, db: Connection): Promise<boolean>;
export declare function chkUsernameValid(user_name: string, db: Connection): Promise<boolean>;
export declare function handleLogin(user: {
    user_name: string;
    password: string;
}, db: Connection): Promise<boolean>;
//# sourceMappingURL=user.d.ts.map