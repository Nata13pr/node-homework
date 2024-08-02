import { Router } from "express";

import { userController } from "../../controllers/user/user.controller";
import { commonMiddleware } from "../../middleware/common.middleware";
import { authMiddleware } from "../../middleware/user/auth.middleware";
import { UserValidator } from "../../validation/user.validation";

const router = Router();

router.get("/", userController.getList);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userController.updateMe,
);
router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);

export const userRouter = router;
