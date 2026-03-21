const TABLE_NAME = "users";
const TABLE_COLS = {
    user_name: "user_name",
    email: "email",
    password: "password",
};
const ENC_KEY = "temp_key";
export function handleUserRegister(con, user) {
    con.connect((connect_err) => {
        if (connect_err)
            console.warn("Connect err: " + connect_err);
        else {
            const query = `INSERT INTO users (user_name, email, password)` +
                `VALUES ('${user.user_name}', '${user.email}', AES_ENCRYPT('${user.password}', '${ENC_KEY}'));`;
            con.query(query, (query_err) => {
                if (query_err)
                    console.warn(query_err?.message);
                else {
                    console.log("USER INSERT DONE");
                }
            });
        }
    });
}
export function chkEmailValid(email, con) {
    let ret_val = true;
    // check if email already exists
    con.connect((connect_err) => {
        if (connect_err)
            console.warn("Connect err: " + connect_err);
        else {
            const query = `SELECT * FROM users WHERE email = '${email}';`;
            con.query(query, (query_err, res) => {
                if (query_err)
                    console.warn(query_err);
                if (res)
                    ret_val = false;
            });
        }
    });
    return ret_val;
}
export function chkUsernameValid(user_name, con) {
    let ret_val = true;
    // check user_name exist
    con.connect((connect_err) => {
        if (connect_err)
            console.warn("Connect err: " + connect_err);
        else {
            const query = `SELECT * FROM users WHERE user_name = '${user_name}';`;
            con.query(query, (query_err, res) => {
                if (query_err)
                    console.warn(query_err);
                if (res)
                    ret_val = false;
                else
                    ret_val = true;
            });
        }
    });
    return ret_val;
}
export function handleLogin(user, con) {
    let valid_info = false;
    con.connect((connect_err) => {
        if (connect_err)
            console.warn(connect_err);
        else {
            const query = `SELECT * FROM users WHERE` +
                ` user_name = ${user.user_name} & password = AES_ENCRYPT(${user.password}, '${ENC_KEY}');`;
            con.query(query, (query_err, res) => {
                if (query_err)
                    console.warn(query_err);
                else {
                    if (res)
                        valid_info = true;
                }
            });
        }
    });
}
//# sourceMappingURL=user.js.map