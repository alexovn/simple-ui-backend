import { Controller, Get, Param, Body, Post, Patch, Delete, Query, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

import { UserCreateDto } from "./dto/user-create.dto";
import { UserUpdateDto, UserUpdateParamsDto } from "./dto/user-update.dto";
import { UserGetParamsDto, UserGetQueryDto } from "./dto/user-get.dto";
import { UserDeleteParamsDto } from "./dto/user-delete.dto";
import { UsersGetQueryDto } from "./dto/users-get.dto";

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query() query: UsersGetQueryDto) {
    return await this.userService.getUsers(query)
  }

  @Get('email')
  async getUserByEmail(@Query() query: UserGetQueryDto) {
    const user = await this.userService.getUserByEmail(query)
    if (!user) {
      throw new NotFoundException(`User with email ${query.email} not found`)
    }
    return user
  }

  @Get(':id')
  async getUserById(@Param() params: UserGetParamsDto) {
    const user = await this.userService.getUserById(params)
    if (!user) {
      throw new NotFoundException(`User with id ${params.id} not found`)
    }
    return user
  }

  @Post()
  async createUser(@Body() data: UserCreateDto) {
    return await this.userService.createUser(data)
  }

  @Patch(':id')
  async updateUser(
    @Param() params: UserUpdateParamsDto,
    @Body() data: UserUpdateDto
  ) {
    return await this.userService.updateUser({ params, data})
  }

  @Delete(':id')
  async deleteUser(@Param() params: UserDeleteParamsDto) {
    return await this.userService.deleteUser(params)
  }
}