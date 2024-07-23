import { Router } from "express";

import { authController } from "../../controllers/user/auth.controller";
import { commonMiddleware } from "../../middleware/common.middleware";
import { UserValidator } from "../../validation/user.validation";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  authController.signUp,
);

router.post(
  "/sign-in",
  commonMiddleware.isBodyValid(UserValidator.login),
  authController.signIn,
);

router.post("/refreshToken", authController.refreshToken);

export const authRouter = router;
