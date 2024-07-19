import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
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
      const carId = Number(req.params.carId);
      if (!carId) {
        throw new ApiError("   Write carId or write a number not symbols", 409);
      }
      const car = await carService.getCarById(carId);

      res.json(car);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = Number(req.params.carId);

      const dto = req.body as any;

      const car = await carService.update(dto, carId);

      res.json(car);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = Number(req.params.carId);
      if (!carId) {
        throw new ApiError("   Write carId or write a number not symbols", 409);
      }

      await carService.delete(carId);

      res.status(201).send({ message: "Car deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
