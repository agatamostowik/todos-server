import bcrypt from "bcrypt";
import { createUser } from "../models/index.js";

const saltRounds = 10;

export const signUpController = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const encryptedUser = { ...req.body, password: hashedPassword };

  const user = await createUser(encryptedUser);
  res.json(user);
};
