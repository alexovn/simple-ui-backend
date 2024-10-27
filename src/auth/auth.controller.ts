import { Controller, UseGuards, Post, Request, BadRequestException, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RegiesterResponsetDto } from "./dto/register-response.dto";
import { RegisterRequestDto } from "./dto/register.request.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any): Promise<LoginResponseDto | BadRequestException> {
    return await this.authService.login(req.user)
  }

  @Post('register')
  async register(@Body() body: RegisterRequestDto): Promise<RegiesterResponsetDto | BadRequestException> {
    return await this.authService.register(body)
  }
}