import express from "express";
import config from "./config";
import router from "./route";

import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";
import { RequestLogger } from "./middleware/logger";
import helmets from "helmet";
import rateLimiter from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many request",
});

app.use(helmet());

app.use(limiter);

const allowedOrigins = ["http://localhost:3000/"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed"));
      }
    },
  })
);

app.use(express.json());

app.use(RequestLogger);

app.use(router);

app.use(notFoundError);

app.use(genericErrorHandler);

app.listen(config.port, () => {
  console.log(`app is listening on ${config.port}`);
});
