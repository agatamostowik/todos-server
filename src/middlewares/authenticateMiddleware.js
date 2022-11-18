import passport from "passport";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../models/index.js";
import LocalStrategy from "passport-local";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, next) => {
      const user = await getUserByEmail(email);

      if (user) {
        const isAuthenticated = await bcrypt.compare(password, user.password);

        if (isAuthenticated) {
          return next(null, user);
        } else {
          return next(null, false, { message: "Password incorrect" });
        }
      } else {
        return next(null, false, { message: "Email incorrect" });
      }
    }
  )
);

export const authenticateMiddleware = passport.authenticate("local");
