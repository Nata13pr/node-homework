import { NextFunction, Request, Response } from "express";

import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { IToken } from "../interfaces/token.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public checkToken(tokenType: TokenTypeEnum) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const header = req.headers.authorization;

        if (!header) {
          throw new ApiError("Token is not provided", 401);
        }
        const token = header.split("Bearer ")[1];

        const payload = tokenService.checkToken(token, tokenType);

        let pair: IToken;
        switch (tokenType) {
          case TokenTypeEnum.ACCESS:
            pair = await tokenRepository.findByParams({
              accessToken: token,
            });
            break;
          case TokenTypeEnum.REFRESH:
            pair = await tokenRepository.findByParams({
              refreshToken: token,
            });
            break;
          default:
            throw new ApiError("Invalid type", 400);
        }
        if (!pair) {
          throw new ApiError("Token is not valid", 401);
        }

        req.res.locals.tokenId = pair._id;
        req.res.locals.jwtPayload = payload;
        next();
      } catch (e) {
        next(new ApiError(e, 400));
      }
    };
  }

  public async checkActionToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const actionToken = req.headers.authorization;
      if (!actionToken) {
        throw new ApiError("Token is not provided", 401);
      }
      const payload = tokenService.checkActionToken(
        actionToken,
        ActionTokenTypeEnum.FORGOT_PASSWORD,
      );

      const entity = await actionTokenRepository.getByActionToken(actionToken);
      if (!entity) {
        throw new ApiError("Token is not valid", 401);
      }
      req.res.locals.jwtPayload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
