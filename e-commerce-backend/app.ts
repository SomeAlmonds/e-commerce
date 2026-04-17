import express from "express";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import helmet from "helmet";
import cors from "cors";
import usersRouter from "./routes/users_route.js";
import productsRouter from "./routes/products_route.js";
import reviewsRouter from "./routes/reviews_route.js";

const app = express();
const PORT = process.env.PORT;

////// MIDDLEWARE CONFIG //////

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  // temp values
  limit: 1,
});

const speedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 1,
  delayMs: (hits) => hits * 100,
});

const cors_options = {
  origin: "https://e-commerce-khaki-six.vercel.app/",
  methods: ["Get", "Post", "Put"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

///////////////////////////////

///////// MIDDLEWARE //////////

app.use(express.json());
app.use(rateLimiter);
app.use(speedLimiter);
app.use(helmet());
app.use(cors(cors_options));

///////////////////////////////

/////////// ROUTES ////////////

app.use("/v1/users", usersRouter);
app.use("/v1/products", productsRouter);
app.use("/v1/reviews", reviewsRouter);

///////////////////////////////

app.use("/", (req, res) => {
  res.send({
    message: `listining to ${req.protocol}://${req.get("host")}/${req.baseUrl}`,
  });
});

app.listen(PORT);

export default app;
