import type { mysql_con_type } from "./db.js";
export declare function handleUserRegister(con: mysql_con_type, user: {
    user_name: string;
    email: string;
    password: string;
}): void;
export declare function chkEmailValid(email: string, con: mysql_con_type): boolean;
export declare function chkUsernameValid(user_name: string, con: mysql_con_type): boolean;
export declare function handleLogin(user: {
    user_name: string;
    password: string;
}, con: mysql_con_type): void;
//# sourceMappingURL=user.d.ts.map