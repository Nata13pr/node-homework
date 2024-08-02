import mongoose, { Schema } from "mongoose";

import { IOldPassword } from "../../interfaces/user/old-password.interface";

const oldPasswordSchema = new Schema(
  {
    oldPassword: { type: String, required: true },

    _userId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OldPassword = mongoose.model<IOldPassword>(
  "oldPassword",
  oldPasswordSchema,
);
