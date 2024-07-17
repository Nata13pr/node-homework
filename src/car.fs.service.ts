import fs from "node:fs/promises";
import path from "node:path";

import { ICar } from "./interfaces/car.interface";

const pathToDB = path.join(process.cwd(), "cars.json");

class FsCarService {
  public async read(): Promise<ICar[]> {
    const json = await fs.readFile(pathToDB, "utf-8");
    return json ? JSON.parse(json) : [];
  }

  public async write(users: ICar[]): Promise<void> {
    await fs.writeFile(pathToDB, JSON.stringify(users));
  }
}

export const fsCarService = new FsCarService();
