import { UploadedFile } from "express-fileupload";
import { configs } from "../configs/configs";

import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async getList(query: any): Promise<IUser[]> {
    return await userRepository.getList(query);
  }

  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async getMe(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async updateMe(userId: string, dto: IUser): Promise<IUser> {
    return await userRepository.updateById(userId, dto);
  }

  public async deleteMe(userId: string): Promise<void> {
    await userRepository.deleteById(userId);
  }

  public async uploadAvatar(
    userId: string,
    file: UploadedFile,
  ): Promise<IUser> {
    const user = await userRepository.getById(userId);
console.log(configs,'configs')
    const avatar = await s3Service.uploadFile("user", userId, file);
    console.log(avatar,'avatar');
    const updatedUser = await userRepository.updateById(userId, { avatar });

    if (user.avatar) {
      // TODO: Delete old avatar
    }

    return updatedUser;
  }
}

export const userService = new UserService();