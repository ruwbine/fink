import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AuthUser } from './auth-user.types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<AuthUser> {
    return this.service.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<AuthUser> {
    return this.service.login(dto);
  }
}
