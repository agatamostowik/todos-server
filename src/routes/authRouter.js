import { Router } from "express";
import { signInController } from "../controllers/signInController.js";
import { signUpController } from "../controllers/signUpController.js";
import { signOutController } from "../controllers/signOutController.js";
import { profileController } from "../controllers/profileCotroller.js";
import { validateSignInMiddleware } from "../middlewares/validateSignInMiddleware.js";
import { validateSignUpMiddleware } from "../middlewares/validateSignUpMiddleware.js";
import { validateEmailUniquenessMiddleware } from "../middlewares/validateEmailUniquenessMiddleware.js";
import { authenticateMiddleware } from "../middlewares/authenticateMiddleware.js";

export const authRouter = Router();

authRouter.get("/me", profileController);
authRouter.post(
  "/signin",
  validateSignInMiddleware,
  authenticateMiddleware,
  signInController
);
authRouter.post(
  "/signup",
  validateSignUpMiddleware,
  validateEmailUniquenessMiddleware,
  signUpController
);

authRouter.post("/signout", signOutController);
