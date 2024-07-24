import mongoose, { Schema } from "mongoose";
import { IToken } from "../interfaces/token.interface";

const tokenSchema=new Schema(
  {
    accessToken:{type:String,required: true},
    refreshToken:{type:String,required: true},

    _userId:{type:Schema.Types.ObjectId,required: true},
  },
  {
    timestamps:true,
    versionKey:false
  }
)

export const Token=mongoose.model<IToken>('tokens',tokenSchema)