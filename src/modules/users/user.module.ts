import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaUserRepository } from './user.prisma-repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserModule {}
