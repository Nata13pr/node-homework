import Joi from "joi";

export const UserSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().integer().min(18).max(100),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(new RegExp("^[+-]?\\d{9,13}$")),
  role: Joi.string().alphanum().min(3).max(30),
});
