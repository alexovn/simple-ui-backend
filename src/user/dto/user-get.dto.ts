import { IsEmail, IsUUID } from "class-validator";

export class UserGetParamsDto {
  @IsUUID()
  id: string
}

export class UserGetQueryDto {
  @IsEmail()
  email: string
}