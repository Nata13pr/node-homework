import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../errors/api-error";
import { userRepository } from "../../repositories/user.repository";

class UserMiddleware {

  public async ifUserExists(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;

      const user = await userRepository.getUserById(userId);

      if (!user) {
        throw new ApiError("User not found", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async ifPasswordAdded(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const password = req.body.password;

      if (password) {
        throw new ApiError("You can't  the  password", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
