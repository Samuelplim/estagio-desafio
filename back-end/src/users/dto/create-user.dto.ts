import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(8, 16)
  password: string;
}
