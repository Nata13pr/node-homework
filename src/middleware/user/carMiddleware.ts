import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../errors/api-error";
import { carRepository } from "../../repositories/car.repository";

class CarMiddleware {
  public async ifCarExists(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = req.params.carId;

      const car = await carRepository.getCarById(carId);

      if (!car) {
        throw new ApiError("User not found", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarMiddleware();
