import { ApiError } from "../errors/api-error";
import { fsService } from "../fs.service";
import { IUser } from "../interfaces/user.interface";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await fsService.read();
  }

  public async create(dto: IUser): Promise<IUser> {
    const users = await fsService.read();

    const index = users.findIndex((user) => user.email === dto.email);

    if (index !== -1) {
      throw new ApiError("User with this email already exists", 409);
    }
    const newUser = {
      id: users[users.length - 1].id + 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await fsService.write(users);
    return newUser;
  }

  public async getUserById(id: number): Promise<IUser> {
    const users = await fsService.read();
    const user = await users.find((user) => user.id === id);
    if (!user) {
      throw new ApiError("User not found", 409);
    }
    return user;
  }

  public async update(dto: IUser, id: number): Promise<IUser> {
    const { name, email, password } = dto;

    const users = await this.getList();
    const user = await users.find((user) => user.id === id);
    if (!user) {
      throw new ApiError(`There is no user with id ${id}`, 400);
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await fsService.write(users);

    return user;
  }

  public async delete(id: number): Promise<void> {
    const users = await fsService.read();

    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new ApiError("User not found", 404);
    }
    users.splice(index, 1);

    await fsService.write(users);
  }
}

export const userRepository = new UserRepository();
