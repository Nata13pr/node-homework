import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middleware/common.middleware";
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
  commonMiddleware.ifUserExists,
  userController.getById,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.ifUserExists,
  commonMiddleware.ifPasswordAdded,
  userController.update,
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.ifUserExists,
  userController.delete,
);

export const userRouter = router;
