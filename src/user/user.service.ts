import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User, Users } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true }
    })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { posts: true }
    })
  }

  async getUsers(paginationDto: PaginationDto): Promise<Users> {
    const {
      page = 1,
      limit = 10,
      orderBy = 'createdAt',
      orderDirection = 'desc'
    } = paginationDto

    const skip = (page - 1) * limit

    const users = await this.prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { [orderBy]: orderDirection },
      include: { posts: true }
    })

    const total = await this.prisma.user.count()
    const totalPages = Math.ceil(total / limit)

    return {
      data: users,
      meta: {
        page,
        total,
        totalPages
      }
    }
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
      include: { posts: true }
    })
  }

  async updateUser(params: { id: number, data: UpdateUserDto }): Promise<User> {
    const { id, data } = params

    return this.prisma.user.update({
      where: { id },
      data,
      include: { posts: true }
    })
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
      include: { posts: true }
    })
  }
}