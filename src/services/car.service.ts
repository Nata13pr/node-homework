import { ApiError } from "../errors/api-error";
import { ICar } from "../interfaces/car.interface";
import { carRepository } from "../repositories/car.repository";

class CarService {
  public async getList(): Promise<ICar[]> {
    return await carRepository.getList();
  }

  public async getCarById(id: number): Promise<ICar> {
    return await carRepository.getCarrById(id);
  }

  public async update(dto: ICar, id: number): Promise<ICar> {
    const { brand, year, price } = dto;

    if (!brand || brand.length < 3) {
      throw new ApiError(
        "brand is required and should be at least 3 characters",
        400,
      );
    }

    if (!year || year <= 1990) {
      throw new ApiError("year is required and should be valid", 400);
    }

    if (!price || price < 2000) {
      throw new ApiError(
        "if (!price || price < 2000) {\n is required and should be at least 6 characters",
        400,
      );
    }

    return await carRepository.update(brand, year, price, id);
  }

  public async delete(id: number): Promise<void> {
    await carRepository.delete(id);
  }

  public async create(dto: ICar): Promise<ICar> {
    const { brand, year, price } = dto;

    if (!brand || brand.length < 3) {
      throw new ApiError(
        "brand is required and should be at least 3 characters",
        400,
      );
    }
    if (!year || year <= 1990) {
      throw new ApiError("year is required and should be valid", 400);
    }
    if (!price || price < 2000) {
      throw new ApiError(
        "    if (!price || price < 2000) {\n is required and should be at least 6 characters",
        400,
      );
    }
    return await carRepository.create(dto);
  }
}

export const carService = new CarService();
