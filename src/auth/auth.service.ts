import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './types/accessToken.type';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email)
    if (!user) {
      throw new BadRequestException('User not found')
    }
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
      throw new BadRequestException('Password does not match')
    }
    return user
  }

  async login(user: User): Promise<AccessToken> {
    const payload = { id: user.id, email: user.email }
    return { access_token: this.jwtService.sign(payload) }
  }

  async register(user: CreateUserDto): Promise<AccessToken> {
    const existingUser = await this.userService.getUserByEmail(user.email)
    if (existingUser) {
      throw new BadRequestException('Email already exists')
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = { ...user, password: hashedPassword }
    const createdUser = await this.userService.createUser(newUser)
    return this.login(createdUser)
  }
}