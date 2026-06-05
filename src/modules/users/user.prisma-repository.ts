import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from '../auth/dto';
import { IUser } from './user.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async create(dto: RegisterDto): Promise<IUser> {
    return this.prisma.user.create({
      data: {
        username: dto.username,
        passwordHash: dto.password,
        email: dto.email,
      },
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
