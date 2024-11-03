import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User, Users } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { GetUserByEmailDto } from "./dto/get-user-by-email.dto";
import { UsersRequestDto } from "./dto/users-request.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(params: GetUserByIdDto): Promise<User | null> {
    const { id } = params

    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true }
    })
  }

  async getUserByEmail(params: GetUserByEmailDto): Promise<User | null> {
    const { email } = params

    return this.prisma.user.findUnique({
      where: { email },
      include: { posts: true }
    })
  }

  async getUsers(usersRequestDto: UsersRequestDto): Promise<Users> {
    const {
      page = 1,
      limit = 10,
      orderBy = 'createdAt',
      orderDirection = 'desc'
    } = usersRequestDto

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

  async updateUser(params: { id: string, data: UpdateUserDto }): Promise<User> {
    const { id, data } = params

    return this.prisma.user.update({
      where: { id },
      data,
      include: { posts: true }
    })
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
      include: { posts: true }
    })
  }
}