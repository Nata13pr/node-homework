import { FilterQuery } from "mongoose";

import { IOldPassword } from "../../interfaces/user/old-password.interface";
import { IToken } from "../../interfaces/user/token.interface";
import { OldPassword } from "../../models/user/old-password.model";

interface DeleteResult {
  acknowledged: boolean;
  deletedCount: number;
}

class OldPasswordRepository {
  public async create(dto: IOldPassword): Promise<void> {
    await OldPassword.create(dto);
  }

  public async findById(id: string): Promise<IOldPassword[]> {
    return await OldPassword.find({ _userId: id });
  }

  public async deleteByParams(
    params: FilterQuery<IToken>,
  ): Promise<DeleteResult> {
    return await OldPassword.deleteMany(params);
  }
}

export const oldPasswordRepository = new OldPasswordRepository();
