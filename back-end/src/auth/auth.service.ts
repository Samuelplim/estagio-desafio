import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserService } from "src/user/user.service";
import { Prisma } from "@prisma/client";
import { UserPayload } from "./models/UserPayload";
import { UserToken } from "./models/UserToken";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(user: Prisma.UserCreateInput): Promise<UserToken> {
    const payload: UserPayload = {
      sub: 1,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error("Email address or password provided is incorrect.");
    /*throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );*/
  }
}
