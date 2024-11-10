import { Role as PrismaRole } from "@prisma/client"
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator'
import { ErrorEnum } from "../enums/error.enum"
import { ApiProperty } from "@nestjs/swagger"

export class UserCreateDto {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
  
  @ApiProperty({ required: false })
  firstName?: string

  @ApiProperty({ required: false })
  lastName?: string

  @ApiProperty({ enum: PrismaRole })
  @IsEnum(PrismaRole, { message: ErrorEnum.ROLE_IS_NOT_VALID })
  role: PrismaRole
}