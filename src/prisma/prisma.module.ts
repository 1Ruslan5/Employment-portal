import { Module } from "@nestjs/common";
import { PostgreSqlPrismaService } from "@app/prisma/prisma.postgres.service";


@Module({
  providers: [PostgreSqlPrismaService],
  exports: [PostgreSqlPrismaService],
})
export class PrismaModule {}
