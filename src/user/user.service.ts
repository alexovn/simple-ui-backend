import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User, Users } from "./interfaces/user.interface";

import { UserCreateDto } from "./dto/user-create.dto";
import { UserUpdateDto, UserUpdateParamsDto } from "./dto/user-update.dto";
import { UserGetParamsDto, UserGetQueryDto } from './dto/user-get.dto';
import { UserDeleteParamsDto } from "./dto/user-delete.dto";
import { UsersGetQueryDto } from "./dto/users-get.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(params: UserGetParamsDto): Promise<User | null> {
    const { id } = params

    return this.prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          include: {
            author: true
          }
        }
      }
    })
  }

  async getUserByEmail(query: UserGetQueryDto): Promise<User | null> {
    const { email } = query

    return this.prisma.user.findUnique({
      where: { email },
      include: {
        posts: {
          include: {
            author: true
          }
        }
      }
    })
  }

  async getUsers(query: UsersGetQueryDto): Promise<Users> {
    const {
      page = 1,
      limit = 10,
      orderBy = 'createdAt',
      orderDirection = 'desc'
    } = query

    const skip = (page - 1) * limit

    const users = await this.prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { [orderBy]: orderDirection },
      include: {
        posts: {
          include: {
            author: true
          }
        }
      }
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

  async createUser(data: UserCreateDto): Promise<User> {
    return this.prisma.user.create({
      data,
      include: {
        posts: {
          include: {
            author: true
          }
        }
      }
    })
  }

  async updateUser(
    {
      params,
      data,
    }:{
      params: UserUpdateParamsDto,
      data: UserUpdateDto
    }
  ): Promise<User> {
    const { id } = params

    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        posts: {
          include: {
            author: true
          }
        }
      }
    })
  }

  async deleteUser(params: UserDeleteParamsDto): Promise<User> {
    const { id } = params

    return this.prisma.user.delete({
      where: { id },
      include: {
        posts: {
          include: {
            author: true
          }
        }
      }
    })
  }
}