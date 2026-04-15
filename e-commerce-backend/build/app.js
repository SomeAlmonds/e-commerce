import express from "express";
import userRouter from "./routes/users_route.js";
import helmet from "helmet";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
// app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.ALLOWED_ORIGIN,
//     methods: ["Get", "Post", "Put"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );
app.use("/v1/users", userRouter);
app.use("/", (req, res) => {
    res.send({
        message: `listining to ${req.protocol}://${req.get("host")}/${req.baseUrl}`,
    });
});
app.listen(PORT);
export default app;
//# sourceMappingURL=app.js.map