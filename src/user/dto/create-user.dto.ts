import { Role as PrismaRole } from "@prisma/client"

export class CreateUserDto {
  email: string
  password: string
  firstName?: string
  lastName?: string
  role: PrismaRole
}