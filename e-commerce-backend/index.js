import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT)

app.get("/", (req, res) => {
  res.send(`listining to ${req.protocol}://${req.get('host')}/${req.baseUrl}`);
})

app.get("/register", (req, res) => {
  // look if user info (email and username) already exists
    // send res

  // send user info to database
    // send res 

  
})

export default app;