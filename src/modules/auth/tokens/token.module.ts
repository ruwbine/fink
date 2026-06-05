import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/config/app.config';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  exports: [TokenService, JwtModule],
})
export class TokenModule {}
