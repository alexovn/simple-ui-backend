import { Controller, Get, Param, Body, Post, Patch, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(Number(id))
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers()
  }

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data)
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUser({ id: Number(id), data})
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id))
  }
}