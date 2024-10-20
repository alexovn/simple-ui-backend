import { Role as PrismaRole } from "@prisma/client"

export class UpdateUserDto {
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  role?: PrismaRole
}