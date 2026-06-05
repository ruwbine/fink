import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './tokens/token.service';
import { UserModule } from '../users/user.module';
import { TokenModule } from './tokens/token.module';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
