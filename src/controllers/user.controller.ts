import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      if (!userId) {
        throw new ApiError(
          "   Write userId or write a number not symbols",
          409,
        );
      }
      const user = await userService.getUserById(userId);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);

      if (!userId) {
        throw new ApiError(
          "   Write userId or write a number not symbols",
          409,
        );
      }
      const dto = req.body as any;

      const user = await userService.update(dto, userId);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      if (!userId) {
        throw new ApiError(
          "   Write userId or write a number not symbols",
          409,
        );
      }

      await userService.delete(userId);

      res.status(201).send({ message: "User deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
