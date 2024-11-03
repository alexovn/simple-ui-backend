import { Controller, Get, Param, Body, Post, Patch, Delete, Query, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRequestDto } from "./dto/users-request.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { GetUserByIdDto } from "./dto/get-user-by-id.dto";
import { GetUserByEmailDto } from "./dto/get-user-by-email.dto";

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
  })
  async getUsers(@Query() usersRequestDto: UsersRequestDto) {
    return await this.userService.getUsers(usersRequestDto)
  }

  @Get('email')
  async getUserByEmail(@Query('email') params: GetUserByEmailDto) {
    const user = await this.userService.getUserByEmail(params)
    if (!user) {
      throw new NotFoundException(`User with email ${params.email} not found`)
    }
    return user
  }

  @Get(':id')
  async getUserById(@Param() params: GetUserByIdDto) {
    const user = await this.userService.getUserById(params)
    if (!user) {
      throw new NotFoundException(`User with id ${params.id} not found`)
    }
    return user
  }

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data)
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto
  ) {
    return await this.userService.updateUser({ id, data})
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id)
  }
}