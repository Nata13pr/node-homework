import { FilterQuery } from "mongoose";

import { IToken } from "../../interfaces/user/token.interface";
import { Token } from "../../models/user/token.model";

class TokenRepository {
  public async create(dto: IToken): Promise<IToken> {
    return await Token.create(dto);
  }

  public async findByParams(params: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async deleteById(id: string): Promise<void> {
    await Token.deleteOne({ _id: id });
  }
}

export const tokenRepository = new TokenRepository();
