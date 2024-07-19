import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api-error";

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

}

export const commonMiddleware = new CommonMiddleware();
