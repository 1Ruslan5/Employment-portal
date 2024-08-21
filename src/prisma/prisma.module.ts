import { Module } from "@nestjs/common";
import { PostgreSqlPrismaService } from "@app/";


@Module({
  providers: [PostgreSqlPrismaService],
  exports: [PostgreSqlPrismaService],
})
export class PrismaModule {}