import bcrypt from "bcrypt";
import passport from "passport";
import { createUser } from "../models/index.js";

const saltRounds = 10;

export const signUpController = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const encryptedUser = { ...req.body, password: hashedPassword };

  const user = await createUser(encryptedUser);

  req.login(user, (error) => {
    if (error) {
      console.log(error);
    }

    res.json(user);
  });
};
