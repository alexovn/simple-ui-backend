import { Role as PrismaRole } from "@prisma/client"
import { IsEmail, IsEnum, IsOptional } from "class-validator"
import { ErrorEnum } from "../enums/error.enum"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiProperty({ required: false })
  firstName?: string

  @ApiProperty({ required: false })
  lastName?: string

  @ApiProperty({ required: false })
  password?: string

  @ApiProperty({ required: false, enum: PrismaRole })
  @IsOptional()
  @IsEnum(PrismaRole, { message: ErrorEnum.ROLE_IS_NOT_VALID })
  role?: PrismaRole
}