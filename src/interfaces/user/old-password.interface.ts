import { IUser } from "./user.interface";

export interface IOldPassword {
  oldPassword: string;
  _userId: string | IUser;
}
