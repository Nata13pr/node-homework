import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);

router.get(
  "/me",
  authMiddleware.checkToken(TokenTypeEnum.ACCESS),
  userController.getMe,
);
router.put(
  "/me",
  authMiddleware.checkToken(TokenTypeEnum.ACCESS),
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userController.updateMe,
);
router.delete(
  "/me",
  authMiddleware.checkToken(TokenTypeEnum.ACCESS),
  userController.deleteMe,
);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);

export const userRouter = router;
