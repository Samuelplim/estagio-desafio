import { Controller, Post, Body, Get, Param, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

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

  @Patch(":id")
  update(@Param("id") id: number) {
    return this.userService.findOne;
  }
}
