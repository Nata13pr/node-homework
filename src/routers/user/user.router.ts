import { Router } from "express";

import { userController } from "../../controllers/user/user.controller";
import { commonMiddleware } from "../../middleware/common.middleware";
import { authMiddleware } from "../../middleware/user/auth.middleware";
import { userMiddleware } from "../../middleware/user/userMiddleware";
import { UserValidator } from "../../validation/user.validation";
// import { UserSchema } from "../../validation/user.validation";

const router = Router();

router.get("/", userController.getList);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.ifUserExists,
  userController.getById,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userMiddleware.ifUserExists,
  userMiddleware.ifPasswordAdded,
  userController.updateById,
);

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.ifUserExists,
  userController.deleteById,
);

export const userRouter = router;
