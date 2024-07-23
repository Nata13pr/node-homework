import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../errors/api-error";
import { IUser } from "../../interfaces/user/user.interface";
import { tokenRepository } from "../../repositories/user/token.repository";
import { authService } from "../../services/user/auth.service";
import { tokenService } from "../../services/user/token.service";


class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
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

      await tokenRepository.findByParamsAndDelete({ refreshToken });

      const tokens = await tokenService.generatePair({
        userId: payload.userId,
        role: payload.role,
      });

      const result = { payload, tokens };

      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
