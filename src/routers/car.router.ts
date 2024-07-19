import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { commonMiddleware } from "../middleware/common.middleware";
import { carMiddleware } from "../middleware/user/carMiddleware";
import { CarSchema } from "../validation/car.validation";

const router = Router();

router.get("/", carController.getList);

router.post("/",commonMiddleware.isBodyValid(CarSchema), carController.create);
router.get("/:carId",commonMiddleware.isIdValid('carId'),carMiddleware.ifCarExists, carController.getById);
router.put("/:carId",commonMiddleware.isIdValid('carId'),carMiddleware.ifCarExists, carController.update);
router.delete("/:carId",commonMiddleware.isIdValid('carId'),carMiddleware.ifCarExists, carController.delete);

export const carRouter = router;
