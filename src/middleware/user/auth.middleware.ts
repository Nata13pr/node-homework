import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../errors/api-error";
import { tokenRepository } from "../../repositories/user/token.repository";
import { tokenService } from "../../services/user/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("Token is not provided", 401);
      }
      const accessToken = header.split("Bearer ")[1];
      const payload = tokenService.checkToken(accessToken);
      console.log(accessToken,'accessToken');
      const pair = await tokenRepository.findByParams({ accessToken });
      console.log(pair,'pair');
      if (!pair) {
        throw new ApiError("Token is not valid", 401);
      }
      req.res.locals.jwtPayload = payload;
      req.res.locals.oldTokensId=pair._userId
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new ApiError("Token is not provided", 401);
      }
      const payload = tokenService.refreshToken(refreshToken);

      const pair = await tokenRepository.findByParams({ refreshToken });

      if (!pair) {
        throw new ApiError("Token is not valid", 401);
      }
      req.res.locals.jwtPayload = payload;
      req.res.locals.oldTokensId = pair._userId;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
