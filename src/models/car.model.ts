import mongoose from "mongoose";

import { ICar } from "../interfaces/car.interface";

const { Schema } = mongoose;

const carSchema = new Schema(
  {
    brand: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },

    isVerified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = mongoose.model<ICar>("cars", carSchema);
