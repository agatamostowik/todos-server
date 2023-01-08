import passport from "passport";
import { getUserById } from "./models/index.js";
import bcrypt from "bcrypt";
import { getUserByEmail } from "./models/index.js";
import LocalStrategy from "passport-local";

export const ps = passport;

ps.serializeUser((user, done) => {
  done(null, user.id);
});

ps.deserializeUser((id, done) => {
  done(null, getUserById(id));
});

ps.use(
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
