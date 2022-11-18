import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import { rootRouter } from "./routes/index.js";
import cookieSession from "cookie-session";
import { getUserById } from "./models/index.js";

export const initApp = () => {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: [
        "https://todos-node-client.herokuapp.com/",
        "http://localhost:3000",
      ],
    })
  );

  app.use(bodyParser.json());

  app.use(
    cookieSession({
      keys: ["key1", "key2"],
      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    done(null, getUserById(id));
  });

  app.use("/", rootRouter);

  return app;
};
