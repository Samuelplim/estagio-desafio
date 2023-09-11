import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return;
  }

  findOne(id: number) {
    return;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return;
  }
  remove(id: number) {
    return;
  }
}
