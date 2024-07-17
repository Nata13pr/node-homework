import { Router } from "express";

import { carController } from "../controllers/car.controller";

const router = Router();

router.get("/", carController.getList);
router.post("/", carController.create);
router.get("/:carId", carController.getById);
router.put("/:carId", carController.update);
router.delete("/:carId", carController.delete);

export const carRouter = router;
