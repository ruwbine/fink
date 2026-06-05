import 'dotenv/config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pgPool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const adapter = new PrismaPg(pgPool);
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.$queryRaw`SELECT 1`;
      Logger.log('Database connection established');
    } catch (error) {
      Logger.error('Database connection failed', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
