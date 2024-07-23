import { Router } from "express";

import { carController } from "../../controllers/car/car.controller";
import { carMiddleware } from "../../middleware/car/carMiddleware";
import { commonMiddleware } from "../../middleware/common.middleware";
import { CarSchema } from "../../validation/car.validation";

const router = Router();

router.get("/", carController.getList);

router.post("/", commonMiddleware.isBodyValid(CarSchema), carController.create);
router.get(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.ifCarExists,
  carController.getById,
);
router.put(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.ifCarExists,
  carController.update,
);
router.delete(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.ifCarExists,
  carController.delete,
);

export const carRouter = router;
