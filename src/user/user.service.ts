import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true }
    })
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { posts: true }
    })
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