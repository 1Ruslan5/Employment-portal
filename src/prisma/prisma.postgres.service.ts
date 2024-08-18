import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '@client/Mongo/generated.clientMongo';


@Injectable()
export class MongoPrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}