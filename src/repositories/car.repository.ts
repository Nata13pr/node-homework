import { fsCarService } from "../car.fs.service";
import { ApiError } from "../errors/api-error";
import { ICar } from "../interfaces/car.interface";

class CarRepository {
  public async getList(): Promise<ICar[]> {
    return await fsCarService.read();
  }

  public async getUserById(id: number): Promise<ICar> {
    const users = await fsCarService.read();
    const user = await users.find((user) => user.id === id);
    if (!user) {
      throw new ApiError("Car not found", 409);
    }
    return user;
  }

  public async update(dto: ICar, id: number): Promise<ICar> {
    const { brand, year, price } = dto;

    const cars = await this.getList();
    const car = await cars.find((car) => car.id === id);

    if (!car) {
      throw new ApiError(`There is no car with id ${id}`, 400);
    }

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

    car.brand = brand;
    car.year = year;
    car.price = price;

    await fsCarService.write(cars);

    return car;
  }

  public async create(dto: ICar): Promise<ICar> {
    const cars = await fsCarService.read();

    const newCar = {
      id: cars[cars.length - 1].id + 1,
      brand: dto.brand,
      year: dto.year,
      price: dto.price,
    };
    cars.push(newCar);
    await fsCarService.write(cars);
    return newCar;
  }

  public async delete(id: number): Promise<void> {
    const cars = await fsCarService.read();

    const index = cars.findIndex((car) => car.id === id);
    if (index === -1) {
      throw new ApiError("Car not found", 404);
    }
    cars.splice(index, 1);

    await fsCarService.write(cars);
  }
}

export const carRepository = new CarRepository();
