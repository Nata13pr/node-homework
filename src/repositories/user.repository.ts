import { IUpdateUser } from "../interfaces/user/updateUser.interface";
import { IUser } from "../interfaces/user/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }

  public async getUserById(id: string): Promise<IUser> {
    return await User.findById(id);
  }

  public async update(dto: IUpdateUser, id: string): Promise<IUpdateUser> {
    const { name, email, phone, age } = dto;

    const user = await this.getUserById(id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (age) user.age = age;

    await User.updateOne(user);

    return user;
  }

  public async delete(id: string): Promise<void> {
    await User.findOneAndDelete({ _id: id });
  }
}
export const userRepository = new UserRepository();
