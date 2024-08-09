import joi from "joi";

export class FileValidator {
  private static size = joi.number().max(5 * 1024 * 1024);
  private static mimetype = joi
    .string()
    .valid("image/jpeg", "image/png", "image/gif");

  public static uploadFile = joi.object({
    size: this.size.required(),
    mimetype: this.mimetype.required(),
  });
}
