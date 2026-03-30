import express from "express";
import userRouter from "./routes/user_route.js";
import helmet from "helmet";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;
console.log(process.env.LOG);
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5000/",
    methods: ["Get", "Post", "Put"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/user", userRouter);
app.use("/", (req, res) => {
    res.send(`listining to ${req.protocol}://${req.get("host")}/${req.baseUrl}`);
});
app.listen(PORT);
export default app;
//# sourceMappingURL=index.js.map