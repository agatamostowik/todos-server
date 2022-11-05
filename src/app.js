import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { rootRouter } from "./routes/index.js";

export const initApp = () => {
  const app = express();

  app.use(
    cors({
      origin: [
        "https://todos-node-client.herokuapp.com/",
        "http://localhost:3000",
      ],
    })
  );
  app.use(bodyParser.json());
  app.use("/", rootRouter);

  return app;
};
