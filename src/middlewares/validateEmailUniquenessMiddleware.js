import { getUserByEmail } from "../models/index.js";

export const validateEmailUniquenessMiddleware = async (req, res, next) => {
  const result = await getUserByEmail(req.body.email);

  if (result) {
    res.status(400).send("Bad request: user already exists");
  } else {
    next();
  }
};
