import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT)

app.get("/", (req, res) => {
  res.send(`listining to ${req.protocol}://${req.get('host')}/${req.baseUrl}`);
})

export default app;