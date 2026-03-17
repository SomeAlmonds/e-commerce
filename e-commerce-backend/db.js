import mysql from "mysql2";

const con = mysql.createConnection({
  host: "almohanads-mysql-almohanads-proj.f.aivencloud.com",
  user: "almohanad",
  password: "AVNS_7Cug3pMuzrwv9qd3x7J",
  port: 21652,
  database: "defaultdb",
});

con.connect((err) => {
  if (err) throw err;
  
  // costumers:
  //   id - name - email? - password - credit card - orders?
  // reviews (json file?)
  //   id - costumer_id - product_id - content - stars_num - date 
  // orders (json file?)
  //   id - costumer_id - product_id - date - quantity 

  const query = "CREATE TABLE costumers" +
   "(user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, user_name VARCHAR(255), email VARCHAR(255), password VARCHAR(255));"  
  +"CREATE TABLE reviews" + 
  "(review_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, user_id INT NOT NULL, product_id INT NOT NULL, review_txt VARCHAR, stars VARCHAR(255));"
  + "CREATE TABLE orders" + 
  "(order_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, user_id INT NOT NULL, date DATE, quantity INT);"+
  "DELETE TABLE products;"
   
  con.query(query3, (err, result) => {
    if (err) throw err;

    console.log(result)
  })
});
