import { Router } from "express";
import { signInController } from "../controllers/signInController.js";
import { signUpController } from "../controllers/signUpController.js";
import { validateSignInMiddleware } from "../middlewares/validateSignInMiddleware.js";
import { validateSignUpMiddleware } from "../middlewares/validateSignUpMiddleware.js";
import { validateEmailUniquenessMiddleware } from "../middlewares/validateEmailUniquenessMiddleware.js";

export const authRouter = Router();

authRouter.post("/signin", validateSignInMiddleware, signInController);
authRouter.post(
  "/signup",
  validateSignUpMiddleware,
  validateEmailUniquenessMiddleware,
  signUpController
);
