import Joi from "joi";

export const CarSchema = Joi.object({
  brand: Joi.string().alphanum().min(3).max(30).required(),
  year: Joi.number().integer().min(1998).max(2024),
  price: Joi.number().integer().min(2000).max(50000),
});
