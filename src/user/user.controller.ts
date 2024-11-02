import { Controller, Get, Param, Body, Post, Patch, Delete, Query, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersResponseDto } from "./dto/users-response.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dto/pagination.dto";

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
  })
  async getUsers(@Query() paginationDto: PaginationDto) {
    return await this.userService.getUsers(paginationDto)
  }

  @Get('email')
  async getUserByEmail(@Query('email') email: string) {
    const user = await this.userService.getUserByEmail(email)
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`)
    }
    return user
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(Number(id))
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return user
  }

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data)
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.userService.updateUser({ id: Number(id), data})
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(Number(id))
  }
}