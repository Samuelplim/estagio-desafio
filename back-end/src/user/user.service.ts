import { HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 8),
      },
    });

    return { ...createdUser, password: undefined };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findOne(id) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new HttpException("User não encontrado", HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { data, where } = params;

    return await this.prisma.user.update({ where, data });
  }

  async remove(id: number) {
    await this.findOne(id);

    const response = await this.prisma.user.delete({ where: { id } });
    return response;
  }
}
