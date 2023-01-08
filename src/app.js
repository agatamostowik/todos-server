import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import { rootRouter } from "./routes/index.js";
import cookieSession from "cookie-session";
import { getUserById } from "./models/index.js";
// import { ps as passport } from "./passport.js";

export const initApp = () => {
  const app = express();

  // Global middlewares
  app.use(
    cors({
      credentials: true,
      origin: [
        "https://not-another-boring-todolist.up.railway.app",
        "http://localhost:3000",
      ],
    })
  );
  app.use(bodyParser.json());
  app.use(
    cookieSession({
      keys: ["key1", "key2"],
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

  // Routes
  app.use("/", rootRouter);

  return app;
};
