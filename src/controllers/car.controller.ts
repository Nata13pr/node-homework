import { NextFunction, Request, Response } from "express";
import { ICar } from "../interfaces/car.interface";

import { carService } from "../services/car.service";

class CarController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await carService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const result = await carService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = req.params.carId;

      const car = await carService.getCarById(carId);

      res.json(car);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = req.params.carId;

      const dto = req.body as ICar;

      const car = await carService.update(dto, carId);

      res.json(car);
    } catch (e) {
      next(e);
    }
  }

  public async delete       (req: Request, res: Response, next: NextFunction) {

    try {
      const carId = req.params.carId;

      await carService.delete(carId)

      res.status(201).send({ message: "Car deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
