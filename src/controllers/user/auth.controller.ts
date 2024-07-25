import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../../interfaces/user/token.interface";
import { ILogin, IUser } from "../../interfaces/user/user.interface";
// import { tokenRepository } from "../../repositories/user/token.repository";
import { authService } from "../../services/user/auth.service";
// import { tokenService } from "../../services/user/token.service";

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
      const dto = req.body as ILogin;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const oldTokensId = req.res.locals.oldTokensId as string;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      await authService.logout(oldTokensId, jwtPayload);

      res.status(204).send("logout");
    } catch (e) {
      next(e);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const oldTokens = req.res.locals.oldTokensId as string;

      const result = await authService.refresh(jwtPayload, oldTokens);

      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
