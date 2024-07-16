import { User } from "../interface/user";
import { BaseModel } from "./BaseModel";

export class UserModel extends BaseModel {
  static async create(user: User) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    await this.queryBuilder().insert(userToCreate).table("users");
  }
}
