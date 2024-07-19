import { ICar } from "../interfaces/car.interface";
import { Car } from "../models/car.model";

class CarRepository {
  public async getList(): Promise<ICar[]> {
    return await Car.find();
  }

  public async getCarById(id: string): Promise<ICar> {
    return await Car.findById(id);
  }

  public async update(
    brand: string,
    year: number,
    price: number,
    id: string,
  ): Promise<ICar> {
    const car = await this.getCarById(id);

    if (brand) car.brand = brand;
    if (year) car.year = year;
    if (price) car.price = price;

    await Car.updateOne(car);

    return car;
  }

  public async create(dto: ICar): Promise<ICar> {
    return await Car.create(dto);
  }

  public async delete(id: string): Promise<void> {
    await Car.findOneAndDelete({ _id: id });
  }
}

export const carRepository = new CarRepository();
