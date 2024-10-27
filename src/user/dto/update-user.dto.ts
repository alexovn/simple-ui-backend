import { Role as PrismaRole } from "@prisma/client"
import { IsEmail, IsEnum, IsOptional } from "class-validator"
import { ErrorEnum } from "../enums/error.enum"

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string

  firstName?: string
  lastName?: string
  password?: string

  @IsOptional()
  @IsEnum(PrismaRole, { message: ErrorEnum.ROLE_IS_NOT_VALID })
  role?: PrismaRole
}