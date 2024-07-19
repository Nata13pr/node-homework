import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api-error";
import { userRepository } from "../repositories/user.repository";

class CommonMiddleware {
  public isIdValid(paramName: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[paramName];
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError("Invalid id", 400);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(schema: Joi.Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error } = schema.validate(req.body);

        if (error) {
          throw new ApiError(
            `Invalid body: ${error.details.map((detail) => detail.message).join(", ")}`,
            400,
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

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

export const commonMiddleware = new CommonMiddleware();
