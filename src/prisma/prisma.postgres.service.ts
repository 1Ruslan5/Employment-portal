import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@client/Postgres/generated.clientPostgres';

@Injectable()
export class PostgreSqlPrismaService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
