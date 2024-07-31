import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/user.controller";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  authController.signUp,
);
router.post(
  "/verify",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY_PASSWORD),
  userController.verifyMe,
);

router.post(
  "/sign-in",
  commonMiddleware.isBodyValid(UserValidator.login),
  authController.signIn,
);

router.post(
  "/refresh",
  authMiddleware.checkToken(TokenTypeEnum.REFRESH),
  // authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.post(
  "/logout",
  authMiddleware.checkToken(TokenTypeEnum.ACCESS),
  authController.logout,
);
router.post(
  "/logout-all",
  authMiddleware.checkToken(TokenTypeEnum.ACCESS),
  authController.logoutAll,
);

router.post(
  "/forgot-password",
  commonMiddleware.isBodyValid(UserValidator.forgotPassword),
  authController.forgotPassword,
);
router.put(
  "/forgot-password",
  commonMiddleware.isBodyValid(UserValidator.forgotPasswordSet),
  authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
  authController.forgotPasswordSet,
);

export const authRouter = router;
