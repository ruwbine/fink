import { IUser } from 'src/modules/users';
import { TokenPairs } from './token.types';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/config/app.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(user: IUser): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return await this.jwtService.signAsync(payload, {
      secret: AppConfig.jwt.secrets.jwt_access_secret,
      expiresIn: AppConfig.jwt.duration.jwt_access_expires_in as number,
    });
  }
  async generateRefreshToken(user: IUser): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return await this.jwtService.signAsync(payload, {
      secret: AppConfig.jwt.secrets.jwt_refresh_secret,
      expiresIn: AppConfig.jwt.duration.jwt_refresh_expires_in as number,
    });
  }
  async generateTokenPairs(user: IUser): Promise<TokenPairs> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    const pairs: TokenPairs = {
      accessToken,
      refreshToken,
    };

    return pairs;
  }
}
