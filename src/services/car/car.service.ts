import { ICar } from "../../interfaces/car.interface";
import { carRepository } from "../../repositories/car/car.repository";

class CarService {
  public async getList(): Promise<ICar[]> {
    return await carRepository.getList();
  }

  public async getCarById(id: string): Promise<ICar> {
    return await carRepository.getCarById(id);
  }

  public async update(dto: ICar, id: string): Promise<ICar> {
    return await carRepository.update(dto.brand, dto.year, dto.price, id);
  }

  public async delete(id: string): Promise<void> {
    await carRepository.delete(id);
  }

  public async create(dto: ICar): Promise<ICar> {
    return await carRepository.create(dto);
  }
}

export const carService = new CarService();
