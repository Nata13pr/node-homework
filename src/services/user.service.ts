import { IUpdateUser } from "../interfaces/user/updateUser.interface";
import { IUser } from "../interfaces/user/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async getUserById(id: string): Promise<IUser> {
    return await userRepository.getUserById(id);
  }

  public async update(dto: IUpdateUser, id: string): Promise<IUpdateUser> {
    return await userRepository.update(dto, id);
  }

  public async delete(id: string): Promise<void> {
    await userRepository.delete(id);
  }

  public async create(dto: IUser): Promise<IUser> {

    return await userRepository.create(dto);
  }
}

export const userService = new UserService();
