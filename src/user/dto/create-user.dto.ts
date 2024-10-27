import { Role as PrismaRole } from "@prisma/client"
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator'
import { ErrorEnum } from "../enums/error.enum"

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
  
  firstName?: string
  lastName?: string

  @IsEnum(PrismaRole, { message: ErrorEnum.ROLE_IS_NOT_VALID })
  role: PrismaRole
}