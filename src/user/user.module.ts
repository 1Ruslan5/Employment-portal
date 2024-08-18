import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { PrismaModule } from "@app/prisma/prisma.module";
import { AuthModule } from "@app/auth/auth.module";
import { AuthGuard } from "@app/auth/guards/auth.guard";


@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthGuard],
  imports: [PrismaModule, AuthModule],
  exports: [UserService],
})
export class UserModule {}