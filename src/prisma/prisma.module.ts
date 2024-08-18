import { Module } from "@nestjs/common";
import { MongoPrismaService } from "./prisma.postgres.service";
import { PostgreSqlPrismaService } from "./prisma.mongo.service";


@Module({
  providers: [MongoPrismaService, PostgreSqlPrismaService],
  exports: [MongoPrismaService, PostgreSqlPrismaService],
})
export class PrismaModule {}