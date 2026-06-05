import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import type { IUser } from '../users';
import { AuthUser } from './auth-user.types';
import * as bcrypt from 'bcrypt';
import { TokenService } from './tokens/token.service';
import { AppConfig } from 'src/config/app.config';
import { TokenPairs } from './tokens/token.types';
import { UserMapper } from '../users/user.mapper';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private repo: UserRepository,
    private tokenService: TokenService,
  ) {}

  async login(dto: LoginDto): Promise<AuthUser> {
    const { email, password } = dto;

    const user: IUser | null = await this.repo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        'Password or user is incorrect, try with different credentials',
      );
    }

    const correct: boolean = await bcrypt.compare(password, user.passwordHash);

    if (!correct) {
      throw new UnauthorizedException(
        'Password or user is incorrect, try with different credentials',
      );
    }

    const tokenPairs = await this.tokenService.generateTokenPairs(user);

    const response: AuthUser = {
      accessToken: tokenPairs.accessToken,
      refreshToken: tokenPairs.refreshToken,
      user: UserMapper.mapUser(user),
    };
    return response;
  }

  async register(dto: RegisterDto): Promise<AuthUser> {
    const { email, password, username } = dto;

    const user: IUser | null = await this.repo.findByEmail(email);

    if (user) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword: string = await bcrypt.hash(
      password,
      AppConfig.bcrypt.saltRounds,
    );

    const created: IUser = await this.repo.create({
      email,
      password: hashedPassword,
      username,
    });

    const tokens: TokenPairs =
      await this.tokenService.generateTokenPairs(created);

    return {
      ...tokens,
      user: UserMapper.mapUser(created),
    };
  }
}
