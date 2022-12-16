import { Router } from "express";
import { todosRouter } from "./todosRouter.js";
import { tagsRouter } from "./tagsRouter.js";
import { authRouter } from "./authRouter.js";

export const apiRouter = Router();

const checkAuthenticationMiddleware = (req, res, next) => {
  // req.isAuthenticated() will return true if user is logged in
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(400).send("nie jestes zalogowany!");
  }
};

apiRouter.use("/todos", checkAuthenticationMiddleware, todosRouter);
apiRouter.use("/tags", tagsRouter);
apiRouter.use("/auth", authRouter);
