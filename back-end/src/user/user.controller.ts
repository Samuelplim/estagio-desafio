import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User as UserModel } from "@prisma/client";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.userService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.userService.remove(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserModel> {
    return this.userService.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
