import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middleware/common.middleware";
import { userMiddleware } from "../middleware/user/userMiddleware";
import { UserSchema } from "../validation/user.validation";

const router = Router();

router.get("/", userController.getList);
router.post(
  "/",
  commonMiddleware.isBodyValid(UserSchema),
  userController.create,
);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.ifUserExists,
  userController.getById,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.ifUserExists,
  commonMiddleware.isBodyValid(UserSchema),
  userMiddleware.ifPasswordAdded,
  userController.update,
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.ifUserExists,
  userController.delete,
);

export const userRouter = router;
